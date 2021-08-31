import path from "path"
import { BuildOutputPlugin } from "../src"
import { build } from "./helpers"

test("Can use the build output plugin", async () => {
  const result = await build({
    entry: {
      index: path.resolve(__dirname, "./fixture/src/index.js"),
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./fixture/dist"),
    },

    plugins: [
      new BuildOutputPlugin(),
    ]
  })

  expect(Object.keys(result.compilation.assets)).toContain("index.js")
})
