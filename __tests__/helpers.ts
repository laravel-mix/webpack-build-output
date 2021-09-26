import { Configuration, Stats, webpack } from "webpack"

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
