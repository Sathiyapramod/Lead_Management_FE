import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    },

    { languageOptions: { globals: globals.browser, sourceType: "module" } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,

    {
        rules: {
            "react/jsx-uses-react": "off",
            "react/jsx-uses-vars": "off",
            //
        },
    },
];
