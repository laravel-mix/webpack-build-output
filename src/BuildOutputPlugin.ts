import { Compiler, Stats } from "webpack"
import { ConsoleOutput, Console } from "./Console"
import { Options } from "./Options"
import { StatsTable } from "./StatsTable"

export class BuildOutputPlugin {
  constructor(private options: Options = {}, private console: ConsoleOutput = new Console(process.stdout)) {}

  public apply(compiler: Compiler) {
    compiler.hooks.done.tap("BuildOutputPlugin", (stats) => this.render(stats))
  }

  public render(stats: Stats) {
    if (stats.hasErrors()) {
      return false
    }

    const data = stats.toJson({
      assets: true,
      builtAt: true,
      hash: true,
      performance: true,
      relatedAssets: this.options.showRelated,
    })

    if (this.options.clearConsole) {
      this.console.clear()
    }

    if (this.options.header) {
      this.console.heading(this.options.header)
    }

    this.console.success(`Compiled Successfully in ${data.time}ms`)

    if (data.assets?.length) {
      this.console.write(new StatsTable(this.options, this.console).render(data))
    }
  }
}
