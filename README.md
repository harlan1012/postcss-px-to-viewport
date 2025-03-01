# postcss-px-to-viewport-modern

## [👉 导航至Github-pages网站](https://harlan1012.github.io/postcss-px-to-viewport-modern/)

The postcss-px-to-viewport-modern plugin features a brand-new architecture and introduces a customizable unit conversion strategy that can be flexibly applied across various scenarios.

全新架构的postcss-px-to-viewport-modern插件，增加了自定义单位转换策略，灵活适用各种场景。

这是一个将像素单位转换为视口单位（vw、vh、vmin、vmax）的PostCSS插件。由于最原始项目[evrone/postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)已经不再维护，且底层架构很旧了，所以这个项目从更新了底层架构框架，且增加了自定义单位转换策略，基于最新版本的PostCSS（8.x）开发。

开发环境：

- node >= 22
- postCSS: "^8.4.49"
- pnpm: "9.15.3"
- tsup: "^8.3.6"
- vite: "^3.0.5"
- vitest: "^3.0.5"
- vitepress: "^1.6.3"

## 安装

要使用这个插件，你需要在你的项目中设置好PostCSS。如果你还没有设置PostCSS，你可以通过运行以下命令来安装：

```bash
npm install postcss --save -D
```

接下来，安装`postcss-px-to-viewport-modern`插件：

```bash
npm install postcss-px-to-viewport-modern --save -D
```

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
| **enableLandscape**           | 为横屏模式添加@media (orientation: landscape)。                                                                            | true                      |
| **parentClass**               | 横屏模式下，在自动增加横屏媒体查询时，将 .xxx 都替换为 .parentClass .xxx，提升代码权重，解决某些情况下横屏样式被覆盖问题。 | ''                        |
| **enableCustomAtRule**        | 启用自定义规则转换。                                                                                                       | true                      |
| **customAtRuleWidth**         | 自定义 @design-width 规则名称(默认为design-width)。                                                                        | 'design-width'            |
| **customAtRuleUnit**          | 自定义 @design-unit 规则名称(默认为design-unit)。                                                                          | 'design-unit'             |

请根据你的项目需求调整这些选项。

## 使用

要在你的PostCSS配置中使用这个插件，将其添加到PostCSS插件列表中，同时加上所需的配置选项。

以下是在`postcss.config.js`中的示例配置：

> 注意：在vite中使用postcss.config.js配置时，无法获取文件路径，如果用需要文件路径判断的逻辑请在vite.config中进行配置

```javascript
// postcss.config.js

module.exports = {
  plugins: {
    'postcss-px-to-viewport-modern': {
      unitType: 'px',
      viewportWidth: 375,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      landscapeViewportWidth: 375,
      landscapeUnit: 'vh',
      landscapeFontViewportUnit: 'vh',
      unitPrecision: 5,
      allowedProperties: ['*'],
      excludedProperties: [],
      selectorBlacklist: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      allowMediaQuery: true,
      replaceRules: true,
      excludeFiles: [],
      includeFiles: [],
      enableLandscape: true,
      enableCustomAtRule: true,
      customAtRuleWidth: 'design-width',
      customAtRuleUnit: 'design-unit',
      // Other configuration options...
    },
  },
}
```

### vite 集成

`vite.config.ts`

```javascript
// 最简写法-采用默认值
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        'postcss-px-to-viewport-modern':({}),
      ],
    },
  },
})
```

```javascript
// 修改配置项
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        'postcss-px-to-viewport-modern':({
          unitType: 'px',
          viewportWidth: 375,
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          landscapeViewportWidth: 375,
          landscapeUnit: 'vh',
          landscapeFontViewportUnit: 'vh',
          unitPrecision: 5,
          allowedProperties: ['*'],
          excludedProperties: [],
          selectorBlacklist: ['.ignore', '.hairlines'],
          minPixelValue: 1,
          allowMediaQuery: true,
          replaceRules: true,
          excludeFiles: [],
          includeFiles: [],
          enableLandscape: true,
          enableCustomAtRule: true,
          customAtRuleWidth: 'design-width',
          customAtRuleUnit: 'design-unit',
          // Other configuration options...
        }),
      ],
    },
  },
})
```

## 启用自定义规则转换

当开启enableCustomAtRule之后，允许使用@design-width 和 @design-unit 自定义规则去分别定义不同文件、class、媒体查询中的转换标准。如下：

```scss
@design-width 375px;
@design-unit vw;
```

插件会读取这个注释并使用指定的宽度来进行单位转换。这对于在同一个项目中为不同的设备（如PC、平板、手机）生成不同的CSS文件特别有用。

### 示例

以下是一个示例配置，将像素值转换为vw单位，默认视口宽度为750像素，并启用@design-width @design-unit配置：

```javascript
// postcss.config.js

module.exports = {
  plugins: {
    'postcss-px-to-viewport-modern': {
      unitType: 'px',
      viewportWidth: 375,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      landscapeViewportWidth: 375,
      landscapeUnit: 'vh',
      landscapeFontViewportUnit: 'vh',
      unitPrecision: 5,
      allowedProperties: ['*'],
      excludedProperties: [],
      selectorBlacklist: [],
      minPixelValue: 1,
      allowMediaQuery: true,
      replaceRules: true,
      excludeFiles: [],
      includeFiles: [],
      enableLandscape: true,
      enableCustomAtRule: true,
      customAtRuleWidth: 'design-width',
      customAtRuleUnit: 'design-unit',
    },
  },
}
```

使用这个配置，你的CSS中的像素值将在PostCSS处理期间自动转换为视口单位。同时，你可以在每个文件中使用注释来指定某个代码块的特定视口宽度。

例如：

```scss
// 针对phone设备进行适配
@design-width 375px;
@design-unit vw;
.box {
  width: 375px; /* 将被转换为 100vw */
}

@media (min-width: 600px) and (orientation: landscape) {
  // 针对pad设备的适配
  @design-width 768px;
  @design-unit vw;
  .box {
    width: 384px; /* 将被转换为 50vw */
  }
}
```

这样，你就可以在一次构建中生成适配多种设备的CSS，同时保持了代码的灵活性和可维护性。

### 自定义规则作用域

#### css根节点中定义，则生效于整个css，不区分代码顺序和嵌套结构

```scss
<style scoped lang="scss">
@design-width 375px;
@design-unit vw;

.container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f0f0f0;
}
</style>
```

#### 单个样式中定义，则仅生效于当前样式块

```scss
.nest {
  @design-width 682px;
  @design-unit vh;
  width: 341px;
}
.nestB{
  width: 100px; // 不会被转换
}
```

#### 媒体查询中首层定义，则生效于整个媒体查询，不区分代码顺序和嵌套结构

```scss
@media (min-width: 600px) and (orientation: landscape) {
  .item-subtitle {
    width: 300px;
  }
  @design-width 1500px;
  @design-unit vh;
  .deep-nest-custom-design-landscape {
    width: 750px;
    .item-title {
      width: 750px;
    }
  }
}
```

#### 变量中的定义，作用于定义位置

```scss
// --custom-width 将按照 375px标准转换，而不是750px标准
@design-width 375px;
@design-unit vw;
body {
  --custom-width: 187.5px; // 按照375转换
}
.custom-property {
  @design-width 750px;
  @design-unit vw;
  width: var(--custom-width); // 不按照750转换
}
```

#### 重点!重点!重点!-不支持样式中的嵌套（原因是解析时，嵌套结构已经被scss解析器压平）

```scss
// index.scss

// 如果最外层未定义@design-width，item-title 不会生效
.deep-nest {
  @design-width 1500px;
  @design-unit vw;
  width: 750px;

  .item-title {
    width: 750px; // 不按照1500转换
  }
}
```

```scss
// index.scss

// 解析时已变成
.deep-nest {
  @design-width 1500px;
  @design-unit vw;
  width: 750px;
}

.deep-nest.item-title {
  width: 750px;
}
```

#### 和配置文件的权重对比

- 自定义权重高于配置文件

```javascript
// postcss.config.js

module.exports = {
  plugins: {
    'postcss-px-to-viewport-modern': {
      unitType: 'px',
      viewportWidth: 375,
      viewportUnit: 'vw',
      enableLandscape: true,
      landscapeUnit: 'vh',
      landscapeViewportWidth: 375,
      /** 新增：自定义 at 规则配置 */
      enableCustomAtRule: true,
    },
  },
}
```

##### 例外情况：自定义单位不生效于enableLandscape自动添加的横屏适配

```scss
// index.scss

  // 例外情况：此时页面横屏，会以postcss.config.js中的landscapeViewportWidth、landscapeUnit去转换 而不是以自定义750转换。
  // 如果需要对横屏下的设计稿尺寸做定制化，请使用媒体查询，自定义变量实现
  @design-width 750px;
  @design-unit vw;

  .item-title {
    width: 750px; // 结果按照自定义750转换： 100vw
  }

```

```scss
// index.scss

  @design-width 750px;
  @design-unit vw;

  .item-title {
    width: 750px; // 结果按照自定义750转换： 100vw
  }

```

```scss
// index.scss

  .item-title {
    @design-width 750px;
    @design-unit vw;
    width: 750px; // 结果按照自定义750转换： 100vw
  }
```

```scss
// index.scss

  @design-width 750px;
  @design-unit vw;
  @media (min-width: 600px) and (orientation: landscape) {
    .item-title {
      width: 750px; // 结果按照自定义750转换： 100vw
    }
  }
```

```scss
// index.scss

  @media (min-width: 600px) and (orientation: landscape) {
    @design-width 750px;
    @design-unit vw;
    .item-title {
      width: 750px; // 结果按照自定义750转换： 100vw
    }
  }
```
