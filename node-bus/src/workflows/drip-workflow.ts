import { DripWorkflowData } from "./workflow-state";
import {
  DripWorkflowTrigger,
  SendEmail,
  SirenTestPassed,
  EmailMaintenanceTeam,
  MaintenanceTeamEmailed,
} from "../messages";
import { Workflow, WorkflowMapper } from "@node-ts/bus-core";
import { bus } from "../bus";

export class DripWorkflow extends Workflow<DripWorkflowData> {
  configureWorkflow(mapper: WorkflowMapper<DripWorkflowData, DripWorkflow>) {
    mapper
      .withState(DripWorkflowData)
      .startedBy(DripWorkflowTrigger, "dripWorkflowStarted")
      .when(SendEmail, "sendEmail", {
        lookup: (event) => {
          return event.id;
        },
        mapsTo: "id",
      })
    .when(MaintenanceTeamEmailed, "handlesMaintenanceTeamEmailed", {
      lookup: (event) => event.id,
      mapsTo: "id",
    });
  }

  dripWorkflowStarted({
    id,
    delay,
  }: DripWorkflowTrigger): Partial<DripWorkflowData> {
    return {
      id,
      delay,
    };
  }

  async sendEmail(
    { id }: SendEmail,
    state: any
  ): Promise<Partial<DripWorkflowData>> {

    console.log('sending email...');

    const emailMaintenanceTeam = new EmailMaintenanceTeam(
      "A siren has failed its test and requires maintenance",
      id
    );
    await bus().send(emailMaintenanceTeam);
    return {};
  }

  async handlesMaintenanceTeamEmailed(
    _: MaintenanceTeamEmailed
  ): Promise<Partial<DripWorkflowData>> {
    return this.completeWorkflow({
      maintenanceEmailSent: true,
    });
  }
}
