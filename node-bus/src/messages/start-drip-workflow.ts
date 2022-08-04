import { Command } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class StartDripWorkflow extends Command {

  static readonly NAME = 'bus-started/start-siren-test'
  readonly $name = StartDripWorkflow.NAME
  readonly $version = 0

  constructor (
    readonly id: Uuid
  ) {
    super()
  }

}
