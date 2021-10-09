import { StatsTable } from "../src/StatsTable"
import { createFakeConfig } from "./utils/Fake"
import { asset } from "./utils/Webpack"

test("The stats table renders as expected", () => {
  const table = new StatsTable(createFakeConfig())

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

test("The stats table can be given a maximum length", () => {
  const table = new StatsTable(createFakeConfig({ maxWidth: 50 }))

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
