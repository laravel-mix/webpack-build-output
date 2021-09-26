/**
 * Customize how the string is truncated
 *
 * @internal
 **/
export interface TruncateOptions {
  length: number
  location?: "start" | "middle" | "end"
  omission?: string
}

/**
 * A somewhat unicode-aware truncation algorithm that can truncate
 * a string to a given length at the start, middle, or end.
 *
 * @internal
 **/
export function truncate(str: string, options: TruncateOptions) {
  options.location = options.location ?? "end"
  options.omission = options.omission ?? "…"

  const strChars = [...str]
  const omissionChars = [...options.omission]
  const maxLength = options.length - omissionChars.length

  if (strChars.length <= options.length) {
    return str
  }

  if (maxLength < 0) {
    return options.omission
  }

  // Based on the location we need to figure out where to slice the original string
  const result: string[] = []

  if (options.location === "start") {
    result.push(...omissionChars)
    result.push(...strChars.slice(strChars.length - maxLength))
  }

  if (options.location === "middle") {
    result.push(...strChars.slice(0, maxLength / 2))
    result.push(...omissionChars)
    result.push(...strChars.slice(strChars.length - maxLength / 2))
  }

  if (options.location === "end") {
    result.push(...strChars.slice(0, maxLength))
    result.push(...omissionChars)
  }

  return result.join("")
}
