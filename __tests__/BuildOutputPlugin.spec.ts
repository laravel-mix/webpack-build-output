import path from "path"
import { BuildOutputPlugin } from "../src/BuildOutputPlugin"
import { BufferConsole } from "./utils/BufferConsole"
import { build, plugin } from "./utils/Webpack"

test("Can use the build output plugin", async () => {
  const console = new BufferConsole(80, 80)

  const result = await build({
    entry: {
      index: path.resolve(__dirname, "./fixture/src/index.js"),
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./fixture/dist"),
    },

    plugins: [
      // Alter the stats seen by the build output plugin
      plugin(compiler => {
        compiler.hooks.done.tap("__tests__", (stats) => {
          const now = +new Date
          stats.compilation.startTime = now
          stats.compilation.endTime = now+100
        })
      }),

      new BuildOutputPlugin({
        colors: false,
        header: "result table",
      }, console),
    ]
  })

  expect(Object.keys(result.compilation.assets)).toContain("index.js")
  expect(console.buffer).toMatchSnapshot()
})
