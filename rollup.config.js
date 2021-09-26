import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import prettier from "rollup-plugin-prettier"

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      exports: "named",
    },
    plugins: [
      typescript({
        target: "es2018",
      })
    ],
    external: ["nanocolors", "table", "strip-ansi", "readline"],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts(),
      prettier(),
    ],
  },
]
