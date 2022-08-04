import { handlerFor } from '@node-ts/bus-core'
import { CustomCommand } from 'messages/custom-command'

export const customCommandHandler = handlerFor(
  CustomCommand,
  async (event) => console.log('custom command received', event)
  )
