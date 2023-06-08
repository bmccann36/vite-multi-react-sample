module.exports = {
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {react: {version: '18.2'}},
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'indent': ['warn', 2],
    'quote-props': ['error', 'as-needed'],
    'object-curly-spacing': ['warn', 'always'],
    'no-unsafe-optional-chaining': 'warn',
    'quotes': ['warn', 'single'],
    'no-unused-vars': 'warn',
  }
};

