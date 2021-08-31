import chalk from "chalk"
import readline from "readline"
import { WriteStream } from "tty"

export interface ConsoleOutput {
  get width(): number
  get height(): number

  clear(): void
  heading(text: string): void
  success(text: string): void
  write(str: string): void
}

export class Console {
  constructor(private stream: WriteStream) {}

  public get width() {
    return this.stream.columns
  }

  public get height() {
    return this.stream.rows
  }

  public clear() {
    this.write("\n".repeat(this.height))
    readline.cursorTo(this.stream, 0, 0)
    readline.clearScreenDown(this.stream)
  }

  /**
   * Print a block section heading.
   */
  public heading(text: string) {
    this.write("\n")
    this.write(chalk.bgBlue.white.bold(this.section(text)))
    this.write("\n")
  }

  /**
   * Print a success message
   */
  public success(text: string) {
    this.write(chalk.green.bold(`✔ ${text}`))
    this.write("\n")
  }

  /**
   * Write directly to the console
   */
  public write(str: string) {
    this.stream.write(str)
  }

  /**
   * Create a block section.
   */
  private section(text: string) {
    const padLength = 3
    const padding = " ".repeat(padLength)

    text = `${padding}${text}${padding}`

    const line = " ".repeat(text.length)

    return `${line}\n${text}\n${line}`
  }
}
