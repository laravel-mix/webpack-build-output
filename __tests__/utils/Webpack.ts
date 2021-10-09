import { Compiler, Configuration, Stats, StatsAsset, WebpackPluginInstance, webpack } from "webpack"

export async function build(config: Configuration): Promise<Stats> {
  return new Promise<Stats>((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject([err])
      } else if (stats!.hasErrors()) {
        reject(stats!.compilation.errors)
      } else {
        resolve(stats!)
      }
    })
  })
}

export function plugin(fn: (compiler: Compiler) => void): WebpackPluginInstance {
  return {
    apply: fn,
  }
}

export function asset(asset: Partial<StatsAsset>): StatsAsset {
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
