import stripAnsi from "strip-ansi"

/**
 * @param {number} size the size in bytes
 * @returns {string} the formatted size
 */
export function formatSize(size: number): string {
  if (Number.isNaN(size) === true) {
    return "unknown"
  }

  const abbreviations = ["bytes", "KB", "MB", "GB", "TB"]

  const index = Math.floor(Math.log(size) / Math.log(10 ** 3))
  const amount = size / 1024 ** index

  return `${amount.toPrecision(3)} ${abbreviations[index]}`
}

let patched = false

export function monkeyPatchTruncate() {
  if (patched) {
    return
  }

  patched = true

  const utils = require("cli-table3/src/utils")
  const oldTruncate = utils.truncate

  // TODO:
  // We want to replace this truncation routine with something
  // custom so we can control how and where truncation happens
  utils.truncate = (str: string, desiredLength: number, truncateChar: string) => {
    if (stripAnsi(str).length > desiredLength) {
      str = `…${str.substr(-desiredLength + 2)}`
    }

    return oldTruncate(str, desiredLength, truncateChar)
  }
}
