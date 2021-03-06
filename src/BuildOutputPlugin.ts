import picocolors, { createColors } from "picocolors"
import { Compiler, Stats } from "webpack"
import { ConsoleOutput, Console } from "./Console"
import { Configuration } from "./Configuration"
import { Options } from "./Options"
import { StatsTable } from "./StatsTable"

/**
 * Add fancy a table to your webpack build output
 **/
export class BuildOutputPlugin {
  /** @internal */
  private configuration: Configuration

  /** @internal */
  public constructor(config: Configuration)

  public constructor(options: Options, console?: ConsoleOutput)

  public constructor(options?: Options | Configuration, console?: ConsoleOutput) {
    if (!(options instanceof Configuration)) {
      options = this.resolveConfig(options ?? {}, console)
    }

    if (!options.console) {
      throw new Error("Custom configurations must provide a console writer to use")
    }

    this.configuration = options
  }

  /**
   * Attach the necessary compiler hooks to render the table after compilation has finished
   */
  public apply(compiler: Compiler) {
    compiler.hooks.done.tap("BuildOutputPlugin", (stats) => this.render(stats))
  }

  /** @internal */
  private render(stats: Stats) {
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

    // In case the header is defined as a get property this will ensure to only access it once
    const header = this.options.header

    if (header) {
      this.console.heading(header)
    }

    this.console.success(`Compiled Successfully in ${data.time}ms`)

    if (data.assets?.length) {
      this.console.write(new StatsTable(this.configuration).render(data))
    }
  }

  /** @internal */
  private resolveConfig(options: Options, console?: ConsoleOutput) {
    const colors = options.colors === undefined ? picocolors : createColors(options.colors)
    const config = new Configuration(options, colors)

    config.console = console ?? new Console(config, process.stdout)

    return config
  }

  /** @internal */
  private get options() {
    return this.configuration.options
  }

  /** @internal */
  private get console() {
    return this.configuration.console!
  }
}
