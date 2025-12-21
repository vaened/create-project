import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  clean: true,
  minify: true,
  sourcemap: false,
  splitting: false,
  target: "node20",
  noExternal: ["@clack/prompts", "fs-extra", "picocolors"],
});
