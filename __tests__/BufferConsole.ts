import { ConsoleOutput } from "../src/Console"

interface Message {
  type: string
  text: string | null
}

export class BufferConsole implements ConsoleOutput {
  public buffer: Message[] = []

  constructor(public width: number, public height: number) {}

  heading(text: string) {
    this.buffer.push({ type: "heading", text })
  }

  success(text: string) {
    this.buffer.push({ type: "success", text })
  }

  write(text: string) {
    this.buffer.push({ type: "write", text })
  }

  clear() {
    this.buffer.push({ type: "clear", text: null })
  }
}
