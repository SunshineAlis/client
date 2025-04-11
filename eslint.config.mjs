import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",         // unused хувьсагчид зөвлөмж л өгнө
      "@typescript-eslint/no-explicit-any": "off",         // any-г алдаа гэж үзэхгүй
      "react/no-unescaped-entities": "off",                // текстэн entity алдаа үгүй
      "@next/next/no-img-element": "off",                  // <img> ашиглахыг зөвшөөрнө
      "react-hooks/exhaustive-deps": "warn"                // hook dependency зөвлөмж хэвээр
    }
  }
];
