---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "postcss-px-to-viewport-modern"
  text: ""
  tagline: 这是一个将像素单位转换为视口单位（vw、vh、vmin、vmax）的PostCSS插件
  actions:
    - theme: brand
      text: 使用说明
      link: /readme
    - theme: alt
      text: 配置项
      link: /api

features:
  - title: 环境
    details: node 22；postCSS 8.0；
  - title: 项目配置
    details: 可以通过postcss.config.ts进行全局单位转换
  - title: 自定义块级配置
    details: 可以通过 @design-width 768px; @design-unit vw; 灵活进行块级单位转换
---
