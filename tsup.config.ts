import { defineConfig } from 'tsup'
import { description, version } from './package.json'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    sourcemap: true,
    clean: true,
    dts: true,
    target: 'es6',
    treeshake: 'smallest',
    banner: {
      js: `/** ${description} v${version}*/`,
    },
    format: ['esm', 'cjs'],
  },
])
