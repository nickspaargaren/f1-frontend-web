module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: [
    'import',
    '@typescript-eslint',
    'simple-import-sort',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'max-len': 'off',
    'simple-import-sort/imports': 'error',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
