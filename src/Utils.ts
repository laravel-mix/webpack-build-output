/**
 * Turn a number of bytes into a human readable size
 *
 * For instance:
 * - 1000 -> 1KB
 * - 3745100 -> 3.745MB
 *
 * @param {number} size the size in bytes
 * @returns {string} the formatted size
 * @internal
 */
export function formatSize(size: number): string {
  if (Number.isNaN(size) === true) {
    return "unknown"
  }

  const abbreviations = ["bytes", "KB", "MB", "GB", "TB"]

  const index = Math.floor(Math.log(size) / Math.log(10 ** 3))
  const amount = size / (1000 ** index)

  const amountStr = index === 0
    ? `${amount}`
    : `${amount.toPrecision(3)}`

  return `${amountStr} ${abbreviations[index]}`
}
