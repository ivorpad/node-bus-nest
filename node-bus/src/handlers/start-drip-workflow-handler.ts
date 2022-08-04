import { StartDripWorkflow, DripWorkflowTrigger } from '../messages'
import { BusInstance, handlerFor } from '@node-ts/bus-core'
import { Uuid } from '../messages/uuid'
import { bus, NestQueue } from '../bus'

const MAX_SIREN_TEST_DURATION = 0

export const startDripWorkflowHandler = handlerFor(
  StartDripWorkflow,
  async ({ id }, state) => {
    console.log('StartDripWorkflow command received, starting workflow test...')
    setTimeout(async () => testSiren(id), MAX_SIREN_TEST_DURATION)
    await bus().publish(new DripWorkflowTrigger(id, 5000))
  }
)

async function testSiren (id: Uuid): Promise<void> {
  NestQueue.publish({pattern: "workflow-started", data: { workflow_id: id }})
}
