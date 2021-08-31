import path from "path"
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
  })

  expect(Object.keys(result.compilation.assets)).toContain("index.js")
})
