import typescript from "@rollup/plugin-typescript"

export default {
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
}
