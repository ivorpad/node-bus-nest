import { Event } from "@node-ts/bus-messages";
import { Uuid } from "./uuid";

export class DripWorkflowTrigger extends Event {
  static readonly NAME = "bus-started/drip-workflow-trigger";
  readonly $name = DripWorkflowTrigger.NAME;
  readonly $version = 0;

  constructor(readonly id: Uuid, readonly delay?: number) {
    super();
  }
}
