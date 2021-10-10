import { defineConfig } from "rollup"
import del from "rollup-plugin-delete"
import dts from "rollup-plugin-dts"
import prettier from "rollup-plugin-prettier"
import typescript from "@rollup/plugin-typescript"

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "esm",
        exports: "named",
        chunkFileNames: "[name].mjs",
        entryFileNames: "[name].mjs",
      },
      {
        dir: "dist",
        format: "cjs",
        exports: "named",
        chunkFileNames: "[name].cjs",
        entryFileNames: "[name].cjs",
      },
    ],
    plugins: [
      typescript({
        target: "es2018",
      }),
    ],
    external: ["picocolors", "table", "strip-ansi", "readline"],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts(),
      prettier(),
      del({
        targets: "dist/*.d.ts",
        hook: "buildEnd",
      }),
    ],
  },
])
