import nextConfig from "eslint-config-next";
import nextTypescript from "eslint-config-next/typescript";
const eslintConfig = [
  ...nextConfig,
  ...nextTypescript,

  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-console": ["error", { "allow": ["error"] }],
      "comma-dangle": ["error", "always-multiline"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "react/no-unescaped-entities": ["off"],
    },
  },
];
export default eslintConfig;
