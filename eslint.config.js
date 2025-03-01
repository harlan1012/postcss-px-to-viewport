import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  markdown: false,
  rules: {
    'no-console': 'off',
  },
})
