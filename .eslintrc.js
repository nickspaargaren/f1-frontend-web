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
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'max-len': 'off',
    'simple-import-sort/imports': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton'],
    }],
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
