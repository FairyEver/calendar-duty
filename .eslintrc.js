module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-lone-blocks': 'off',
    'no-unused-vars': 'off',
    'prefer-const': 'off',
    'brace-style': 'off',
    'dot-notation': 'off',
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
