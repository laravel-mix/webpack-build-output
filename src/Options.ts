export interface Options {
  /**
   * Clear the console when rendering the table
   *
   * Defaults to `true`
   */
  clearConsole?: boolean

  /**
   * Show related assets (when available) in the table
   *
   * Defaults to `false`
   */
  showRelated?: boolean

  /**
   * The header to print (if any)
   *
   * Defaults to `undefined`
   */
  header?: string

  /**
   * Attempt to fit the table within this width if possible
   *
   * Defaults to the width of the current terminal window
   */
  width?: number

  /**
   * The maximum number of columns a table can occupy
   *
   * Defaults to `Infinity`
   */
  maxWidth?: number
}
