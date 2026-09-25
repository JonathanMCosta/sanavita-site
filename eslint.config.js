import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".html", "node_modules"] },
  {
    files: ["**/*.{js,mjs,ts}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  {
    files: ["scripts/**/*.{js,mjs}", "*.config.{js,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
);
