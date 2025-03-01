import type { Options } from './types'

export const PLUGIN_NAME = 'postcss-px-to-viewport'
export const IGNORE_PREV_COMMENT = 'px-to-viewport-ignore'
export const IGNORE_NEXT_COMMENT = 'px-to-viewport-ignore-next'

/**
 * 支持的单位类型常量。
 */
export enum UNIT_TYPES_ENUM {
  PX = 'px',
  EM = 'em',
  REM = 'rem',
}

/**
 * 支持的视口单位类型常量。
 */
export enum VIEWPORT_UNIT_TYPES_ENUM {
  VW = 'vw',
  VH = 'vh',
  VMIN = 'vmin',
  VMAX = 'vmax',
}

/**
 * 支持的字体视口单位类型常量。
 */
export enum FONT_VIEWPORT_UNIT_TYPES_ENUM {
  VW = 'vw',
  VH = 'vh',
  VMIN = 'vmin',
  VMAX = 'vmax',
}

export const DEFAULT_OPTIONS: Options = {
  /** 转换单位（目标识别） */
  unitType: UNIT_TYPES_ENUM.PX, // unitToConvert
  /** 转换单位精度，几位小数 */
  unitPrecision: 5,
  /** 转换基准 */
  viewportWidth: 375,
  /** 转换单位类型（转换结果） */
  viewportUnit: VIEWPORT_UNIT_TYPES_ENUM.VW,
  /** 字体转换单位 */
  fontViewportUnit: FONT_VIEWPORT_UNIT_TYPES_ENUM.VW,
  /** 横屏转换宽度基准 */
  landscapeViewportWidth: 375,
  /** 横屏转换单位 */
  landscapeUnit: VIEWPORT_UNIT_TYPES_ENUM.VH,
  /** 字体转换单位 */
  landscapeFontViewportUnit: FONT_VIEWPORT_UNIT_TYPES_ENUM.VH,
  /** 更新（原selectorBlackList）：黑名单配置 */
  selectorBlacklist: ['.ignore', '.hairlines'],
  /** 新增：白名单配置 */
  selectorWhitelist: [],
  /** 更新（原propList）：允许转换的属性  */
  allowedProperties: ['*'],
  /** 新增：排除属性配置 */
  excludedProperties: [],
  /** 最小可转换的像素单位 */
  minPixelValue: 1,
  /** 更新（原mediaQuery）：开启媒体查询转换 */
  allowMediaQuery: true,
  /** 更新（原replace）：开启规则替换 */
  replaceRules: true,
  /** 更新（原exclude）：排除转换的文件，支持正则 */
  excludeFiles: [],
  /** 更新（原include）：支持转换的文件，支持正则 */
  includeFiles: [],
  /** 更新（原landscape）：开启横屏css自动适配，自动增加横屏媒体查询 */
  enableLandscape: true,
  /** 新增：父级类配置 */
  parentClass: '',
  /** 新增：自定义 at 规则配置 */
  enableCustomAtRule: true,
  /** 新增：自定义 @design-width 规则 */
  customAtRuleWidth: 'design-width',
  /** 新增：自定义 @design-unit 规则 */
  customAtRuleUnit: 'design-unit',
}
