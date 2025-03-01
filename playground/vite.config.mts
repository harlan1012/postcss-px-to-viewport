import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import PostcssPXConversion from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  // 用于 gitlab pages 在线示例
  base: '/postcss-px-to-viewport-plus/playground/',
  // 用于 gitlab pages 在线示例
  build: {
    outDir: '../public/playground',
  },

  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components(),

  ],
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    postcss: {
      plugins: [
        PostcssPXConversion({
          unitType: 'px',
          viewportWidth: (fileName: string) => {
            if (fileName.includes('pad-css')) {
              return 768
            }
            return 750
          },
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
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
          landscapeViewportWidth: 750,
          landscapeUnit: 'vh',
          enableCustomAtRule: true,
          // Other configuration options...
        }),
      ],
    },
  },
})
