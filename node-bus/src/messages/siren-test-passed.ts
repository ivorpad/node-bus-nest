import { Event } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class SirenTestPassed extends Event {

  static readonly NAME = 'bus-starter/siren-test-passed'
  readonly $name = SirenTestPassed.NAME
  readonly $version = 0

  constructor (
    readonly id: Uuid
  ) {
    super()
  }

}
