module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended'],
  plugins: ['import', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.js', '*.ts'],
      rules: {
        'no-undef': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object'],
            pathGroups: [
              {
                pattern: '~/**',
                group: 'parent',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: [],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
