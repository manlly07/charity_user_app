/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig  } */
const prettierConfig = {
    plugins: ["prettier-plugin-organize-imports"],
    semi: false,
    trailingComma: "none",
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    endOfLine: "auto",
  };
  
  export default prettierConfig;
  