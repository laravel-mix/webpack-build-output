import { WriteStream } from "tty"

export class Tty {
  private buffer: string = ""
  private oldWrite: typeof process.stdout.write | undefined = undefined

  constructor(
    private stream: WriteStream
  ) {}

  capture() {
    this.oldWrite = this.stream.write

    // @ts-ignore
    this.stream.write = (str: string) => {
      this.buffer += str
    }

    return this
  }

  stop() {
    if (this.oldWrite) {
      this.stream.write = this.oldWrite
    }
  }

  get output() {
    return this.buffer
  }

  clear() {
    this.buffer = ""
  }
}
