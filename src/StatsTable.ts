import chalk from "chalk"
import Table from "cli-table3"
import stripAnsi from "strip-ansi"
import { StatsCompilation } from "webpack"
import { formatSize, monkeyPatchTruncate } from "./Utils"
import { Options } from "./Options"
import { ConsoleOutput } from "./Console"

export class StatsTable {
  constructor(private options: Options, private console: ConsoleOutput) {}

  /**
   * Print the stats table to the screen
   */
  public render(data: StatsCompilation): string {
    const table = new Table({
      head: [chalk.bold("File"), chalk.bold("Size")],
      colWidths: [35],
      colAligns: ["right"],
      style: {
        head: [],
        compact: true,
      },
    })

    const assets = this.sortAssets(data)

    for (const asset of assets) {
      table.push([chalk.green(asset.name), formatSize(asset.size)])
    }

    this.extendTableWidth(table, this.options.width ?? this.console.width, this.options.maxWidth ?? Infinity)

    monkeyPatchTruncate()

    return table.toString()
  }

  private sortAssets(data: StatsCompilation) {
    let assets = data.assets!.flatMap((asset) => [asset, ...(Array.isArray(asset.related) ? asset.related : [])])

    assets = assets.sort((a, b) => {
      return a.name.localeCompare(b.name) || a.size - b.size
    })

    return assets
  }

  /**
   * Extend the width of the table
   *
   * Currently only increases the file column size
   */
  private extendTableWidth(table: Table.Table, targetWidth: number, maxWidth: number) {
    if (!targetWidth) {
      return
    }

    const tableWidth = this.calculateWidth(table)
    const fileColIncrease = Math.min(targetWidth - tableWidth, maxWidth - tableWidth)

    if (fileColIncrease <= 0) {
      return
    }

    // @ts-ignore
    table.options.colWidths[0] += fileColIncrease
  }

  /**
   * Calculate the width of the CLI Table
   *
   * `table.width` does not report the correct width
   * because it includes ANSI control characters
   */
  private calculateWidth(table: Table.Table) {
    const firstRow = table.toString().split("\n")[0]

    return stripAnsi(firstRow).length
  }
}
