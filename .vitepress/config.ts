import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'postcss-px-to-viewport-modern',
  description: '这是一个将像素单位转换为视口单位（vw、vh、vmin、vmax）的PostCSS插件',
  srcDir: 'docs',
  outDir: 'public',
  base: '/postcss-px-to-viewport-modern',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '配置项', link: '/api' },
      { text: '使用说明', link: '/readme' },
      { text: 'ChangeLog', link: 'https://github.com/harlan1012/postcss-px-to-viewport-modern/-/blob/69bdcee9f3b4bb6c7f7788db917dd6370cc5599c/CHANGELOG.md' },
      {
        text: 'Playground',
        link: 'https://github.com/harlan1012/postcss-px-to-viewport-modern/playground/',
      },
    ],
    sidebar: {
      '/readme': [
        {
          text: '使用说明',
          link: '/readme',
        },
        {
          text: '最佳实践',
          link: '/upgrade',
        },
        {
          text: '开发指南',
          link: '/develop',
        },
      ],
      '/upgrade': [
        {
          text: '使用说明',
          link: '/readme',
        },
        {
          text: '最佳实践',
          link: '/upgrade',
        },
        {
          text: '开发指南',
          link: '/develop',
        },
      ],
      '/develop': [
        {
          text: '使用说明',
          link: '/readme',
        },
        {
          text: '最佳实践',
          link: '/upgrade',
        },
        {
          text: '开发指南',
          link: '/develop',
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/harlan1012/postcss-px-to-viewport-modern' },
    ],
  },
})
