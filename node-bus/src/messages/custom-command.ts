import { Command } from '@node-ts/bus-messages'

export class CustomCommand extends Command {
  static readonly NAME = 'bus-starter/custom-command'
  readonly $name = CustomCommand.NAME
  readonly $version = 0

  constructor (
    readonly message: string,
  ) {
    super()
  }

}
