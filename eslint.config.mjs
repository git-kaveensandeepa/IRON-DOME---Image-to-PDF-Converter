import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "dist/**",
      "node_modules/**",
    ],
  },
  {
    extends: [...next],
  },
]);
