import typescript from "@rollup/plugin-typescript"

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [typescript()],
  external: ["chalk", "cli-table3", "strip-ansi", "readline"],
}
