module.exports = {
  root: true,
  extends: ['@putstack/typescript'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    'sonarjs/cognitive-complexity': ['error', 25],
  },
};
