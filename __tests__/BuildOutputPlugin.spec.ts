import path from "path"
import { BuildOutputPlugin } from "../src"
import { build } from "./helpers"
import { Tty } from "./Tty"

test("Can use the build output plugin", async () => {
  process.stdout.columns = 80
  process.stdout.rows = 80

  // TODO: Use a custom buffering stream or console instead of capturing stdout
  const tty = new Tty(process.stdout).capture()

  const plugin = new BuildOutputPlugin({
    colors: false,
    header: "result table",
  })

  const oldRender = plugin.render.bind(plugin)

  plugin.render = (stats) => {
    const now = +new Date
    stats.compilation.startTime = now
    stats.compilation.endTime = now+100

    return oldRender(stats)
  }

  const result = await build({
    entry: {
      index: path.resolve(__dirname, "./fixture/src/index.js"),
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./fixture/dist"),
    },

    plugins: [
      plugin,
    ]
  })

  expect(Object.keys(result.compilation.assets)).toContain("index.js")
  expect(tty.output).toMatchSnapshot()
})
