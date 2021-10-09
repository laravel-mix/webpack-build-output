import { createColors } from "nanocolors"
import { Options } from "../../src/Options"
import { Configuration } from "../../src/Configuration"
import { ConsoleOutput } from "../../src/Console"

export function createFakeConfig(options?: Options) {
  return new Configuration(
    Object.assign({ showRelated: true, colors: false }, options ?? {}),
    createColors(false),
    new FakeConsole(80, 200)
  )
}

export class FakeConsole implements ConsoleOutput {
  constructor(public width: number, public height: number) {}

  heading() {}
  success() {}
  write() {}
  clear() {}
}
