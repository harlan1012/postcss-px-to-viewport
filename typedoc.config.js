/** @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions} */
export default {
  out: 'docs/api',
  docsRoot: './docs',
  plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
  entryPoints: ['src/index.ts'],
  parametersFormat: 'table',
  readme: 'none',
  indexFormat: 'table',
  useCodeBlocks: true,
  disableSources: true,
}
