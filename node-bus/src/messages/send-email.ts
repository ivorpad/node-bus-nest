import { Event } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class SendEmail extends Event {

  static readonly NAME = 'bus-starter/siren-test-failed'
  readonly $name = SendEmail.NAME
  readonly $version = 0


  constructor (
    readonly id: Uuid,
    readonly message: string
  ) {
    super()
  }

}
