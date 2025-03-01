import type { Declaration, Plugin, Result, Root, Rule } from 'postcss'
import type { Options } from './types'
import { AtRule } from 'postcss'
import { DEFAULT_OPTIONS, IGNORE_NEXT_COMMENT, IGNORE_PREV_COMMENT, PLUGIN_NAME } from './constants'
import {
  createPropertiesListMatcher,
  createUnitReplaceFunction,
  doesDeclarationExist,
  getLandscapeSize,
  getLandscapeUnit,
  getUnitRegexp,
  getViewportSize,
  getViewportUnit,
  shouldExcludeFile,
  shouldExcludeSelector,
  validateMediaQueryParams,
} from './utils'

export interface DeclarationExtend extends Declaration {
  designWidth?: number
  designUnit?: string
}

/**
 * Create a PostCSS plugin for converting pixel units to viewport units.
 * 创建一个 PostCSS 插件，用于将像素单位转换为视口单位。
 *
 * Extended plugin to support @design-width and @design-unit directives while maintaining original functionality
 * 扩展插件以支持 @design-width 和 @design-unit 指令，同时保留原有功能
 *
 * @param customOptions - Custom options to override default options
 * @returns PostCSS plugin
 */
export function plugin(customOptions: Partial<Options> = {}): Plugin {
  // Merge default options with custom options
  // 将默认选项与自定义选项合并
  const options: Options = { ...DEFAULT_OPTIONS, ...customOptions }

  // Get the regular expression for matching the unit type
  // 获取用于匹配单位类型的正则表达式
  const unitRegexp = getUnitRegexp(options.unitType)

  // Create a matcher function for allowed properties
  // 创建一个用于匹配允许属性的函数
  const isAllowedProperty = createPropertiesListMatcher(options.allowedProperties)

  return {
    postcssPlugin: PLUGIN_NAME,

    Once(css: Root, { result }) {
      // Process @design-width rules
      // 处理 @design-width 规则
      css.walkAtRules((atRule) => {
        if (options.enableCustomAtRule && (atRule.name === options.customAtRuleWidth)) {
          const widthMatch = atRule.params.match(/(\d+)px/)
          if (widthMatch) {
            const designWidth = Number.parseInt(widthMatch[1]!, 10)
            atRule.parent?.walkDecls((decl: DeclarationExtend) => {
              decl.designWidth = designWidth
            })
            atRule.remove() // 移除指令
          }
        }

        // Process @design-unit rules
        // 处理 @design-unit 规则
        if (options.enableCustomAtRule && (atRule.name === options.customAtRuleUnit)) {
          const designUnit = atRule.params.trim()
          atRule.parent?.walkDecls((decl: DeclarationExtend) => {
            decl.designUnit = designUnit
          })
          atRule.remove() // 移除指令
        }

        // Process @keyframes rules
        // 处理 @keyframes 规则
        if (atRule.name === 'keyframes') {
          atRule.walkDecls((decl) => {
            if (decl.value.includes(options.unitType)) {
              const { targetUnit, targetSize } = getTargetUnitAndSize(atRule, decl, options, atRule.source?.input.file || '')
              if (targetSize) {
                decl.value = decl.value.replace(
                  unitRegexp,
                  createUnitReplaceFunction(options, targetUnit!, targetSize),
                )
              }
            }
          })
        }
      })

      css.walkRules((rule) => {
        const sourceFile = rule.source?.input.file || ''

        // Check if the rule should be excluded based on file path or selector
        // 检查是否应该根据文件路径或选择器排除该规则
        if (shouldExcludeFile(options, sourceFile) || shouldExcludeSelector(options, rule.selector)) {
          return
        }

        // Handle landscape mode
        // 处理横向模式
        if (!(rule.parent as any)?.params) {
          handleLandscapeMode(css, rule, options, sourceFile, isAllowedProperty, unitRegexp)
        }

        // Validate media query parameters
        // 验证媒体查询参数
        if (!validateMediaQueryParams((rule.parent as any)?.params, options.allowMediaQuery)) {
          return
        }

        // Process declarations within the rule
        // 处理规则内的声明
        processDeclarations(rule, options, sourceFile, isAllowedProperty, unitRegexp, result)
      })
    },
  }
}

/**
 * Process declarations within a rule
 * 处理规则内的声明
 */
export function processDeclarations(
  rule: Rule | AtRule,
  options: Options,
  sourceFile: string,
  isAllowedProperty: (prop: string) => boolean,
  unitRegexp: RegExp,
  result: Result,
) {
  rule.walkDecls((declaration: DeclarationExtend, index: number) => {
    if (!declaration.value.includes(options.unitType) || !isAllowedProperty(declaration.prop)) {
      return
    }

    if (shouldIgnoreDeclaration(declaration, result)) {
      return
    }

    const designWidth = declaration.designWidth // 继承父级配置
    const designUnit = declaration.designUnit // 继承父级配置

    // 从上下文中获取设计稿宽度和目标单位
    const { targetUnit: finalUnit, targetSize } = getTargetUnitAndSize(rule, declaration, options, sourceFile, designWidth, designUnit)

    if (!targetSize) {
      return
    }
    const modifiedValue = declaration.value.replace(
      unitRegexp,
      createUnitReplaceFunction(options, finalUnit!, targetSize),
    )

    if (doesDeclarationExist(declaration.parent, declaration.prop, modifiedValue)) {
      return
    }

    if (options.replaceRules) {
      declaration.value = modifiedValue
    }
    else {
      declaration.parent?.insertAfter(index, declaration.clone({ value: modifiedValue }))
    }
  })
}

/**
 * Get target unit and size based on context
 * 获取目标单位和尺寸
 */
function getTargetUnitAndSize(
  rule: Rule | AtRule,
  declaration: any,
  options: Options,
  sourceFile: string,
  designWidth?: number,
  designUnit?: string,
) {
  const parentParams = (rule.parent as any)?.params
  if (parentParams && parentParams.includes('landscape')) {
    return {
      targetUnit: designUnit || getLandscapeUnit(options, sourceFile, declaration.prop),
      targetSize: designWidth || getLandscapeSize(options, sourceFile),
    }
  }
  else {
    return {
      targetUnit: designUnit || getViewportUnit(options, sourceFile, declaration.prop),
      targetSize: designWidth || getViewportSize(options, sourceFile),
    }
  }
}

/**
 * Handle landscape mode transformations
 * 处理横向模式
 */
export function handleLandscapeMode(
  css: Root,
  rule: Rule,
  options: Options,
  sourceFile: string,
  isAllowedProperty: (prop: string) => boolean,
  unitRegexp: RegExp,
) {
  if (!options.enableLandscape)
    return
  const landscapeRule = rule.clone().removeAll()

  rule.walkDecls((declaration: any) => {
    // 不需要转换的单位类型或者不是允许的属性跳过
    if (!declaration.value.includes(options.unitType) || !isAllowedProperty(declaration.prop)) {
      return
    }

    const landscapeSize = getLandscapeSize(options, sourceFile)
    if (!landscapeSize) {
      return
    }
    const landscapeUnit = getLandscapeUnit(options, sourceFile, declaration.prop)
    if (!landscapeUnit) {
      return
    }
    const decl = declaration.clone({
      value: declaration.value.replace(
        unitRegexp,
        createUnitReplaceFunction(options, landscapeUnit, landscapeSize),
      ),
    })
    landscapeRule.append(decl)
  })

  if (landscapeRule.nodes.length > 0) {
    if (options.parentClass) {
      landscapeRule.selector = `${options.parentClass} ${landscapeRule.selector}`
    }
    addLandscapeMediaQuery(css, [landscapeRule as unknown as AtRule])
  }
}

/**
 * Add landscape media query to the CSS
 * 添加横向媒体查询
 */
function addLandscapeMediaQuery(css: Root, landscapeAtRules: AtRule[]) {
  const landscapeMediaRule = new AtRule({
    params: '(orientation: landscape)',
    name: 'media',
    nodes: landscapeAtRules,
  })
  css.append(landscapeMediaRule)
}

/**
 * Check if a declaration should be ignored based on comments
 * 根据注释检查是否应忽略声明
 */
function shouldIgnoreDeclaration(declaration: any, result: any): boolean {
  const prevComment = declaration.prev()
  if (prevComment && prevComment.type === 'comment' && prevComment.text === IGNORE_NEXT_COMMENT) {
    prevComment.remove()
    return true
  }

  const nextComment = declaration.next()
  if (nextComment && nextComment.type === 'comment' && nextComment.text === IGNORE_PREV_COMMENT) {
    if (/\n/.test(nextComment.raws.before!)) {
      result.warn(
        `Unexpected comment /* ${IGNORE_PREV_COMMENT} */ must be after declaration at the same line.`,
        { node: nextComment },
      )
    }
    else {
      nextComment.remove()
      return true
    }
  }

  return false
}
