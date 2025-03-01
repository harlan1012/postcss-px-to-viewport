# 最佳实践

## 1. 使用nvm + corepack 管理node版本

> 开启corepack自动切换node版本

```bash
corepack enable
```

关闭命令行工具，重新进入项目目录，提示切换到node22.12.0（未安装过则会提示安装，根据依赖安装即可）

## 2. 安装postcss 8.x版本

```bash
pnpm install postcss@8.4.49 -D

```

## 3. 安装postcss-px-to-viewport-plus 插件

```bash
pnpm install postcss-px-to-viewport-plus --save -D
```

## 4. 配置postcss默认配置

```javascript
// vite.config.ts
// 最简写法-采用默认值
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        'postcss-px-to-viewport-plus':({}),
      ],
    },
  },
})
```

```javascript
// vite.config.ts
// 修改配置项
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        'postcss-px-to-viewport-plus':({
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
          // Other configuration options...
        }),
      ],
    },
  },
})
```

## 5. 开始开发

```scss

.cell {
  margin-top: 8px;
  width: 200px;
  height: 160px
  line-height: 21px;
  text-align: center;
  color: #393548;
  font-size: 14px;
}

@media (min-width: 600px) and (orientation: landscape) {
    // pad 适配
    @design-width 768px;
    @design-unit vh;

    .cell {
        margin-top: 12px;
        width: 300px;
        height: 240px
        line-height: 32px;
        text-align: center;
        color: #393548;
        font-size: 21px;
    }
}

@media (min-width: 600px) and (orientation: landscape) {
    // pad 适配
    @design-width 768px;
    @design-unit vh;

    .cell {
        margin-top: 12px;
        width: 300px;
        height: 240px
        line-height: 32px;
        text-align: center;
        color: #393548;
        font-size: 21px;
    }
}

@media screen and (max-aspect-ratio: 1.24) and (min-aspect-ratio: 0.89) {
    // 特定屏幕适配
    @design-width 960px;
    @design-unit vh;

    .cell {
        margin-top: 12px;
        width: 300px;
        height: 240px
        line-height: 32px;
        text-align: center;
        color: #393548;
        font-size: 21px;
    }
}
```
