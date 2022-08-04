import 'reflect-metadata'

import { generateUuid } from './messages/uuid'
import { StartDripWorkflow } from './messages'
import { bus, disposeBus, initializeBus } from './bus'

async function runDemo (): Promise<void> {
  console.log(JSON.stringify(new StartDripWorkflow(generateUuid())))
  await bus().send(new StartDripWorkflow(generateUuid()))
}

const listenForSigInt = () => {
  process.once('SIGINT', async () => {
    console.log('Received SIGINT, shutting down...')
    await disposeBus()
  })
}

listenForSigInt()

initializeBus()
  .then(runDemo)
  .catch(err => {
    console.log(err)
  })
