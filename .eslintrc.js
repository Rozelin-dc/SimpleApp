module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: false
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'space-before-function-paren': [
      2,
      { anonymous: 'never', named: 'never', asyncArrow: 'always' }
    ],
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
