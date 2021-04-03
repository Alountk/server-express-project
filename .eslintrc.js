const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
  ALLOW: ['warn', { allow: ['_id', '__v', 'foo_'] }],
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
    'no-param-reassign': RULES.WARN,
    'no-undescore-dangle': RULES.OFF,
  },
};
