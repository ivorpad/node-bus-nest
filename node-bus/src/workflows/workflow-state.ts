import { WorkflowState } from '@node-ts/bus-core'
import { Uuid } from '../messages/uuid'

export class DripWorkflowData extends WorkflowState {
  $name = 'bus-starter/drip-workflow-data'

  id: Uuid
  maintenanceEmailSent: boolean
  delay?: number
  message?: string
}
