import stripAnsi from "strip-ansi"
import { getBorderCharacters, table, TableUserConfig } from "table"
import { StatsCompilation } from "webpack"
import { formatSize } from "./Utils"
import { Configuration } from "./Configuration"
import { truncate } from "./Truncate"

/**
 * Generate a table representing assets from webpack stats
 *
 * @internal
 **/
export class StatsTable {
  constructor(private configuration: Configuration) {}

  /**
   * Return a table representing the compilation stats as a string
   */
  public render(data: StatsCompilation): string {
    const rows: string[][] = []

    rows.push([this.colors.bold("File"), this.colors.bold("Size")])

    const assets = this.sortAssets(data)

    for (const asset of assets) {
      rows.push([this.colors.green(asset.name), formatSize(asset.size)])
    }

    return this.createTable(rows)
  }

  private sortAssets(data: StatsCompilation) {
    let assets = data.assets!.flatMap((asset) => [asset, ...(Array.isArray(asset.related) ? asset.related : [])])

    assets = assets.sort((a, b) => {
      return a.name.localeCompare(b.name) || a.size - b.size
    })

    return assets
  }

  private get colors() {
    return this.configuration.colors
  }

  private get options() {
    return this.configuration.options
  }

  private get console() {
    return this.configuration.console!
  }

  private createTable(rows: string[][]) {
    const tableConfig: TableUserConfig = {
      border: getBorderCharacters("norc"),

      columns: [{ width: 35, alignment: "right" }, { alignment: "left" }],

      drawHorizontalLine(index) {
        // Top of table == index 0
        // Bottom table header == index 1
        // Bottom table == index rows.length

        return index <= 1 || index === rows.length
      },
    }

    const toTable = () => table(rows, tableConfig).trim()
    const calculateWidth = () => stripAnsi(toTable().split("\n")[0]).length

    const targetWidth = this.options.width ?? this.console.width
    const maxWidth = this.options.maxWidth ?? Infinity

    let currentWidth = calculateWidth()
    let fileColIncrease = Math.min(targetWidth - currentWidth, maxWidth - currentWidth)

    // If the table doesn't fit within the desired width then we increase the width of the file path column
    if (fileColIncrease > 0) {
      // @ts-ignore
      tableConfig.columns![0]!.width! += fileColIncrease
    }

    // start-truncate the path names
    for (const row of rows) {
      row[0] = truncate(row[0], { length: tableConfig.columns![0]!.width!, location: "start" })
    }

    return toTable()
  }
}
