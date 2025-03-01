---
outline: deep
---

## 配置选项

你可以使用各种选项来配置这个插件：

| 选项                          | 描述                                                                                                                       | 默认值                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| **unitType**                  | 要从哪种单位转换（默认为'px'）。                                                                                           | 'px'                      |
| **viewportWidth**             | 视口的宽度转换基准。                                                                                                       | 375                       |
| **viewportUnit**              | 期望转换成的视口单位（vw、vh、vmin、vmax）。                                                                               | 'vw'                      |
| **fontViewportUnit**          | 期望的字体视口单位。                                                                                                       | 'vw'                      |
| **landscapeViewportWidth**    | 横向方向的视口宽度。                                                                                                       | 375                       |
| **landscapeUnit**             | 横向模式的期望单位。                                                                                                       | 'vh'                      |
| **landscapeFontViewportUnit** | 横屏期望的字体视口单位。                                                                                                   | 'vh'                      |
| **unitPrecision**             | 转换精度，vw单位的小数位数。                                                                                               | 3                         |
| **allowedProperties**         | 要转换为vw的CSS属性列表。                                                                                                  | ['*']                     |
| **excludedProperties**        | 要排除在转换之外的CSS属性列表。                                                                                            | []                        |
| **selectorBlacklist**         | 要忽略的选择器（字符串或正则表达式）。                                                                                     | ['.ignore', '.hairlines'] |
| **minPixelValue**             | 要替换的最小像素值。                                                                                                       | 1                         |
| **allowMediaQuery**           | 在媒体查询中允许px到vw的转换。                                                                                             | true                      |
| **replaceRules**              | 替换包含vw的规则而不是添加回退规则。                                                                                       | true                      |
| **excludeFiles**              | 要忽略的文件（作为正则表达式数组）。                                                                                       | []                        |
| **includeFiles**              | 只转换匹配的文件（作为正则表达式数组）。                                                                                   | []                        |
| **enableLandscape**           | 为横向模式添加@media (orientation: landscape)。                                                                            | true                      |
| **parentClass**               | 横屏模式下，在自动增加横屏媒体查询时，将 .xxx 都替换为 .parentClass .xxx，提升代码权重，解决某些情况下横屏样式被覆盖问题。 | ''                        |
| **enableCustomAtRule**        | 启用自定义规则转换。                                                                                                       | true                      |
| **customAtRuleWidth**         | 自定义 @design-width 规则名称(默认为design-width)。                                                                        | 'design-width'            |
| **customAtRuleUnit**          | 自定义 @design-unit 规则名称(默认为design-unit)。                                                                          | 'design-unit'             |

请根据你的项目需求调整这些选项。
