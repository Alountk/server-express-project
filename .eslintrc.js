const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'consistent-return': RULES.WARN,
  },
};
