import readline from "readline"
import { WriteStream } from "tty"
import { Configuration } from "./Configuration"

/**
 * Represents the capabilities to read information about and write data to a console/terminal/etc…
 *
 * @public
 **/
export interface ConsoleOutput {
  get width(): number
  get height(): number

  clear(): void
  heading(text: string): void
  success(text: string): void
  write(str: string): void
}

/**
 * The default internal console implementation that writes to a given stream like `process.stdout`
 *
 * @internal
 **/
export class Console {
  constructor(private configuration: Configuration, private stream: WriteStream) {}

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
    this.write(this.colors.bgBlue(this.colors.bgBlue(this.colors.bold(this.section(text)))))
    this.write("\n")
  }

  /**
   * Print a success message
   */
  public success(text: string) {
    this.write(this.colors.green(this.colors.bold(`✔ ${text}`)))
    this.write("\n")
  }

  /**
   * Write directly to the console
   */
  public write(str: string) {
    this.stream.write(str)
  }

  private get colors() {
    return this.configuration.colors
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
