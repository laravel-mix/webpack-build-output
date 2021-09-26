import path from "path"
import { Compiler } from "webpack"
import { BuildOutputPlugin } from "../src"
import { build } from "./helpers"
import { Tty } from "./Tty"

test("Can use the build output plugin", async () => {
  process.stdout.columns = 80
  process.stdout.rows = 80

  // TODO: Use a custom buffering stream or console instead of capturing stdout
  const tty = new Tty(process.stdout).capture()

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
      {
        apply(compiler: Compiler) {
          compiler.hooks.done.tap("__tests__", (stats) => {
            const now = +new Date
            stats.compilation.startTime = now
            stats.compilation.endTime = now+100
          })
        },
      },

      new BuildOutputPlugin({
        colors: false,
        header: "result table",
      }),
    ]
  })

  expect(Object.keys(result.compilation.assets)).toContain("index.js")
  expect(tty.output).toMatchSnapshot()
})
