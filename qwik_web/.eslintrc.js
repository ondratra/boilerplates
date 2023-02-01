module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:qwik/recommended',
    'prettier',

    // display Prettier errors as ESLint errors - must be last plugin in 'extends' array!
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
  ],
  rules: {
    // general rules
    quotes: [2, 'single'],
    semi: ['error', 'never'],

    // allow occasional 'empty' construct
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    // prevent unused stuff & possible error-causing constructs
    '@typescript-eslint/no-unused-vars': ['error', { "argsIgnorePattern": "^_" }],
    '@typescript-eslint/no-misused-promises': 'error',

    // import/export sorting
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': ['error'],
    'import/no-duplicates': 'error',
  },
};
