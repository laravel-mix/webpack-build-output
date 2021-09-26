import { Colors } from "nanocolors"
import { ConsoleOutput } from "./Console"
import { Options } from "./Options"

/**
 * This configuration object is passed around to any components that need access to the configuration information
 * If that component itself is stored in the config object it must be optional
 *
 * @internal
 **/
export class Configuration {
  constructor(public options: Options, public colors: Colors, public console?: ConsoleOutput) {}
}
