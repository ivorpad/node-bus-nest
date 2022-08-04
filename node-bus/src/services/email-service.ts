import { bus, NestQueue } from '../bus'
import { MaintenanceTeamEmailed } from '../messages'

export const sendEmail = async (message: string, sirenId: string) => {
  console.log('Sending email to maintenance team', { message, sirenId });

  NestQueue.publish({pattern: "get-message", data: { message, sirenId }})

  const maintenanceTeamEmailed = new MaintenanceTeamEmailed(sirenId)
  await bus().publish(maintenanceTeamEmailed)
}
