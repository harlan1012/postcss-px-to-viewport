import type { ContainerWithChildren } from 'postcss/lib/container'
import type { FontViewportUnitType, Options } from '../types'

/**
 * 判断文件是否应该被排除
 * @param options 配置选项
 * @param filePath 文件路径
 * @returns 是否排除文件
 */
export function shouldExcludeFile(options: Options, filePath: string): boolean {
  const isExcluded = options.excludeFiles.some(exclude =>
    (typeof exclude === 'string' && filePath.includes(exclude))
    || (exclude instanceof RegExp && exclude.test(filePath)),
  )

  if (isExcluded) {
    return true
  }

  if (options.includeFiles.length > 0) {
    return !options.includeFiles.some(include =>
      (typeof include === 'string' && filePath.includes(include))
      || (include instanceof RegExp && include.test(filePath)),
    )
  }

  return false
}

/**
 * 判断选择器是否应该被排除
 * @param options 配置选项
 * @param selector 选择器
 * @returns 是否排除选择器
 */
export function shouldExcludeSelector(options: Options, selector: string): boolean {
  const isInBlacklist = isListedSelector(selector, options.selectorBlacklist)

  if (isInBlacklist) {
    return true
  }

  if (options.selectorWhitelist.length > 0) {
    return !isListedSelector(selector, options.selectorWhitelist)
  }

  return false
}

/**
 * 判断选择器是否在列表中
 * @param selector 选择器
 * @param list 列表
 * @returns 是否在列表中
 */
export function isListedSelector(selector: string, list: (string | RegExp)[]): boolean {
  return list.some(item =>
    (typeof item === 'string' && selector.includes(item))
    || (item instanceof RegExp && item.test(selector)),
  )
}

/**
 * 获取要转换的单位
 * @param opts 配置选项
 * @param sourceFile 当前文件路径
 * @param prop 属性
 * @returns 单位
 */
export function getViewportUnit(opts: Options, sourceFile: string, prop: string | string[]) {
  if (typeof opts.viewportUnit === 'function') {
    return opts.viewportUnit(sourceFile)
  }
  return Array.isArray(prop)
    ? opts.viewportUnit
    : (prop.includes('font') ? opts.fontViewportUnit as FontViewportUnitType : opts.viewportUnit)
}

/**
 * 获取要转换的基准尺寸
 * @param opts 配置选项
 * @param sourceFile 当前文件路径
 * @returns 尺寸
 */
export function getViewportSize(opts: Options, sourceFile: string): number | undefined {
  if (typeof opts.viewportWidth === 'function') {
    return opts.viewportWidth(sourceFile)
  }
  return opts.viewportWidth
}
/**
 * 获取横向模式转换的单位
 * @param opts 配置选项
 * @param sourceFile 当前文件路径
 * @param prop 属性
 * @returns 单位
 */
export function getLandscapeUnit(opts: Options, sourceFile: string, prop: string | string[]) {
  if (typeof opts.landscapeUnit === 'function') {
    return opts.landscapeUnit(sourceFile)
  }
  return Array.isArray(prop)
    ? opts.landscapeUnit
    : (prop.includes('font') ? opts.landscapeFontViewportUnit as FontViewportUnitType : opts.landscapeUnit)
}

/**
 * 获取横向模式的视口尺寸
 * @param opts 配置选项
 * @param sourceFile 当前文件路径
 * @returns 尺寸
 */
export function getLandscapeSize(opts: Options, sourceFile: string): number | undefined {
  if (typeof opts.landscapeViewportWidth === 'function') {
    return opts.landscapeViewportWidth(sourceFile)
  }
  return opts.landscapeViewportWidth
}
/**
 * 四舍五入数字到指定的小数位数精度
 * @param number 数字
 * @param precision 精度
 * @returns 四舍五入后的数字
 */
export function roundNumberToPrecision(number: number, precision: number): number {
  // 四舍五入数字到指定的小数位数精度
  const multiplier = 10 ** precision
  return Math.round(number * multiplier) / multiplier
}

/**
 * 创建单位替换函数
 * @param opts 配置选项
 * @param targetUnit 目标单位
 * @param targetSize 目标大小
 * @returns 单位替换函数
 */
export function createUnitReplaceFunction(opts: Options, targetUnit: string, targetSize: number) {
  return (match: string, pixelValue: string) => {
    if (!pixelValue) {
      return match
    }

    const pixels = Number.parseFloat(pixelValue)
    if (pixels <= opts.minPixelValue!) {
      return match
    }

    const convertedValue = roundNumberToPrecision((pixels / targetSize) * 100, opts.unitPrecision!)
    return convertedValue === 0 ? '0' : `${convertedValue}${targetUnit}`
  }
}

/**
 * 判断声明是否存在
 * @param declarations 声明
 * @param property 属性
 * @param value 值
 * @returns 声明是否存在
 */
export function doesDeclarationExist(declarations: ContainerWithChildren | undefined, property: string, value: string) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  return declarations?.some(declaration => declaration?.prop === property && declaration?.value === value)
}

/**
 * 验证媒体查询参数
 * @param params 参数
 * @param requiresMediaQuery 是否需要媒体查询
 * @returns 是否有效
 */
export function validateMediaQueryParams(params: string, requiresMediaQuery: boolean) {
  return !params || (params && requiresMediaQuery)
}
