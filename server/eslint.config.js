const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  }
];
