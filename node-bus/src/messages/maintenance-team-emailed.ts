import { Event } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class MaintenanceTeamEmailed extends Event {

  static readonly NAME = 'bus-starter/maintenance-team-emailed'
  readonly $name = MaintenanceTeamEmailed.NAME
  readonly $version = 0

  constructor (
    readonly id: Uuid
  ) {
    super()
  }

}
