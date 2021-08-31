import { ConsoleOutput } from "../src/Console"

export class FakeConsole implements ConsoleOutput {
  constructor(public width: number, public height: number) {}

  heading() {}
  success() {}
  write() {}
  clear() {}
}
