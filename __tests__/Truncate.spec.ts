import { truncate, TruncateOptions } from "../src/Truncate"

const table: Array<[input: string, output: string, options: TruncateOptions]> = [
  ["foo", "foo", { length: 10, location: "start" }],
  ["foo", "foo", { length: 10, location: "middle" }],
  ["foo", "foo", { length: 10, location: "end" }],
  ["foo/bar/baz/qux.js", "…az/qux.js", { length: 10, location: "start" }],
  ["foo/bar/baz/qux.js", "foo/…ux.js", { length: 10, location: "middle" }],
  ["foo/bar/baz/qux.js", "foo/bar/b…", { length: 10, location: "end" }],
  ["foo/bar/baz/qux.js", "foo/b…ux.js", { length: 11, location: "middle" }],
  ["foo/bar/baz/qux.css", "foo/…x.css", { length: 10, location: "middle" }],
  ["foo/bar/baz/qux.css", "foo/b…x.css", { length: 11, location: "middle" }],
]

test("It can truncate strings", () => {
  for (const [input, output, options] of table) {
    expect( truncate(input, options)).toBe(output)
  }
})

test("Benchmark", () => {
  const start = process.hrtime.bigint()
  for (const [input, _, options] of table) {
    for (let n = 0; n < 1e3; n++) {
      truncate(input, options)
    }
  }

  const usElapsed = (process.hrtime.bigint() - start) / BigInt(1_000)
  const usPerGroup = usElapsed / BigInt(table.length)

  // 1000 calls to truncate shouldn't take more than 2 milliseconds on average
  expect(usPerGroup).toBeLessThan(BigInt(2000))
})
