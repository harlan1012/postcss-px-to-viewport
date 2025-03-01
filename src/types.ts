import type {
  FONT_VIEWPORT_UNIT_TYPES_ENUM,
  UNIT_TYPES_ENUM,
  VIEWPORT_UNIT_TYPES_ENUM,
} from './constants'

/**
 * Type definition for supported unit types.
 * 支持的单位类型的联合类型。
 *
 * Includes "px", "em", "rem", or any other valid custom string type.
 * 包括 "px"、"em"、"rem"，或其他有效的自定义字符串类型。
 */
export type UnitType = `${UNIT_TYPES_ENUM}`
/**
 * Type definition for supported viewport unit types.
 * 支持的视口单位类型的联合类型。
 *
 * Includes "vw", "vh", "vmin", "vmax", or any other valid custom string type.
 * 包括 "vw"、"vh"、"vmin"、"vmax"，或其他有效的自定义字符串类型。
 */
export type ViewportUnitType = `${VIEWPORT_UNIT_TYPES_ENUM}`

/**
 * Type definition for supported font viewport unit types.
 * 支持的字体视口单位类型的联合类型。
 *
 * Includes "vw", "vh", "vmin", "vmax", or any other valid custom string type.
 * 包括 "vw"、"vh"、"vmin"、"vmax"，或其他有效的自定义字符串类型。
 */
export type FontViewportUnitType = `${FONT_VIEWPORT_UNIT_TYPES_ENUM}`

/**
 * Configuration options for the pixel to viewport unit conversion.
 * 像素到视口单位转换的配置选项。
 */
export interface Options {
  /**
   * The unit to convert to, default is "px".
   * 要转换的单位，默认为 "px"。
   *
   * Supports "px", "em", "rem", or any other valid custom string type.
   * 支持 "px"、"em"、"rem"，或其他有效的自定义字符串类型。
   */
  unitType: UnitType

  /**
   * The width of the viewport.
   * 视口的宽度转换基准
   *
   * Can be a number or a function that returns a number based on the file path.
   * 可以是一个数值，或是一个根据文件路径返回数值的函数。
   */
  viewportWidth: number | ((filePath: string) => number | undefined)

  /**
   * The expected viewport unit.
   * 期望的视口单位。
   *
   * Default is "vw". Supports "vw", "vh", "vmin", "vmax", or any other valid custom string type.
   * 默认为 "vw"。支持 "vw"、"vh"、"vmin"、"vmax"，或其他有效的自定义字符串类型。
   */
  viewportUnit: ViewportUnitType | ((filePath: string) => ViewportUnitType)

  /**
   * The expected font unit.
   * 字体的期望单位。
   *
   * Default is "vw". Supports "vw", "vh", "vmin", "vmax", or any other valid custom string type.
   * 默认为 "vw"。支持 "vw"、"vh"、"vmin"、"vmax"，或其他有效的自定义字符串类型。
   */
  fontViewportUnit: FontViewportUnitType | ((filePath: string) => ViewportUnitType)

  /**
   * Viewport width for landscape orientation.
   * 横屏模式下的视口宽度。
   *
   * Can be a number or a function that returns a number based on the file path.
   * 可以是一个数值，或是一个根据文件路径返回数值的函数。
   */
  landscapeViewportWidth: number | ((filePath: string) => number | undefined)

  /**
   * The expected unit for landscape mode.
   * 横屏模式下的期望单位。
   *
   * Default is "vh". Supports "vw", "vh", "vmin", "vmax", or other valid units.
   * 默认为 "vh"。支持 "vw"、"vh"、"vmin"、"vmax" 或其他符合规范的单位。
   */
  landscapeUnit: ViewportUnitType | ((filePath: string) => ViewportUnitType)

  /**
   * The expected font unit.
   * 横屏模式下字体的期望单位。
   *
   * Default is "vh". Supports "vw", "vh", "vmin", "vmax", or any other valid custom string type.
   * 默认为 "vh"。支持 "vw"、"vh"、"vmin"、"vmax"，或其他有效的自定义字符串类型。
   */
  landscapeFontViewportUnit: FontViewportUnitType | ((filePath: string) => ViewportUnitType)

  /**
   * The number of decimal places allowed for vw units.
   * 允许 vw 单位的最小精度。
   */
  unitPrecision: number

  /**
   * List of properties that can be converted to vw.
   * 可以转换为 vw 的属性列表。
   */
  allowedProperties: string[]

  /**
   * List of properties to exclude from conversion.
   * 要排除在转换之外的属性列表。
   */
  excludedProperties: string[]

  /**
   * Selectors to ignore, can include strings or regular expressions.
   * 要忽略的选择器，可以包含字符串或正则表达式。
   */
  selectorBlacklist: (string | RegExp)[]

  /**
   * Selectors only included, can include strings or regular expressions.
   * 要包含的选择器，可以包含字符串或正则表达式。
   */
  selectorWhitelist: (string | RegExp)[]

  /**
   * Minimum pixel value to replace.
   * 进行替换的最小像素值。
   */
  minPixelValue: number

  /**
   * Allow px to vw conversion in media queries.
   * 允许在媒体查询中进行 px 到 vw 的转换。
   */
  allowMediaQuery: boolean

  /**
   * Replace rules containing vw instead of adding fallbacks.
   * 替换包含 vw 的规则，而不是添加回退。
   */
  replaceRules: boolean

  /**
   * Files to ignore as an array of regular expressions.
   * 要忽略的文件，作为正则表达式的数组。
   * @example
   *  [/node_modules/]
   *  [/node_modules/, /pages\/active\/index\.vue/]
   */
  excludeFiles: (string | RegExp)[]

  /**
   * Only convert matching files as an array of regular expressions.
   * 仅转换匹配的文件，作为正则表达式的数组。
   */
  includeFiles: (string | RegExp)[]

  /**
   * Add @media (orientation: landscape) to convert values obtained through landscapeWidth.
   * 添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)。
   */
  enableLandscape: boolean

  /**
   * 父级类配置
   * The parent class to use for the conversion.
   * 横屏模式下，如果存在父级parentClass，则添加到父级css中，否则添加到当前css中
   */

  parentClass: string

  /**
   * 启用自定义规则转换
   */
  enableCustomAtRule: boolean

  /**
   * 新增：自定义 @design-width 规则名称
   */
  customAtRuleWidth: string

  /**
   * 新增：自定义 @design-unit 规则名称
   */
  customAtRuleUnit: string
}
