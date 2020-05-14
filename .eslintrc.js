module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    "plugin:@typescript-eslint/recommended",
    // "plugin:prettier/recommended",
    // "prettier/@typescript-eslint",
    "plugin:react/recommended",
  ],
  plugins: ["@typescript-eslint" /*, "prettier"*/],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": [
      1,
      "backtick",
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/member-delimiter-style": [
      2,
      {
        multiline: {
          delimiter: "none",
        },
      },
    ],
    "react/prop-types": [0],
    indent: ["error", 2, { SwitchCase: 1 }],
    // "prettier/prettier": [
    //   "error",
    //   {
    //     trailingComma: "es5",
    //     semi: false,
    //     singleQuote: false,
    //     printWidth: 120,
    //   },
    // ],
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
}
