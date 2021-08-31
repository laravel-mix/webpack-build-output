import colors from "colors/safe"
import { StatsAsset } from "webpack"

import { StatsTable } from "../src/StatsTable"
import { FakeConsole } from "./FakeConsole"

beforeEach(() => {
  colors.disable()
  process.env.FORCE_COLOR = "0"
})

afterEach(() => {
  delete process.env.FORCE_COLOR
})

test("The build output table renders as expected", () => {
  const table = new StatsTable({ showRelated: true }, new FakeConsole(80, 200))

  const output = table.render({
    assets: [
      asset({
        name: "foo/foo/foo/foo/foo/foo/foo/js/app.js",
        size: 1200,
      }),
      asset({
        name: "foo/foo/foo/foo/foo/foo/foo/js/bar.js",
        size: 1200,
      }),
      asset({
        name: "foo/foo/foo/foo/foo/foo/foo/css/extracted.css",
        size: 1500,
      }),
      asset({
        name: "foo/foo/foo/foo/foo/foo/foo/css/app.css",
        size: 1000,
      }),
    ],
  })

  expect(`\n${output}\n`).toMatchSnapshot()
})

function asset(asset: Partial<StatsAsset>): StatsAsset {
  return {
    name: "foo/foo/foo/foo/foo/foo/foo/js/app.js",
    size: 1200,
    related: [],
    type: "test",
    info: {},
    emitted: false,
    comparedForEmit: false,
    cached: false,
    ...asset,
  }
}
