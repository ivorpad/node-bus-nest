import { startDripWorkflowHandler, emailMaintenanceTeamHandler } from "./handlers";
import { DripWorkflow } from "./workflows";
import {
  RabbitMqTransportConfiguration,
  RabbitMqTransport,
} from "@node-ts/bus-rabbitmq";
import { explainInitializationError } from "./error-helpers";
import { Bus, BusInstance } from "@node-ts/bus-core";
import {
  PostgresPersistence,
  PostgresConfiguration,
} from "@node-ts/bus-postgres";
import { customDelayHandler, customHandler } from "handlers/custom-handler";
import { customCommandHandler } from "handlers/custom-command-handler";
import { RabbitMQ } from "nestQueue";

const queue_options = {
  // durable: false,
  autoDelete: false
};
export const NestQueue: { publish(message: { pattern: string, data: any }): void  } = new RabbitMQ("@app/my-queue-nest", queue_options);

const postgresConfiguration: PostgresConfiguration = {
  connection: {
    connectionString: "postgres://postgres:password@localhost:5433/bus",
  },
  schemaName: "workflows",
};
const postgresPersistence = new PostgresPersistence(postgresConfiguration);

const rabbitMqConfiguration: RabbitMqTransportConfiguration = {
  queueName: "@app/my-queue",
  connectionString: "amqp://localhost:5672",
  maxRetries: 5,
};

const rabbitMq = new RabbitMqTransport(rabbitMqConfiguration);

let busInstance: BusInstance | undefined;

/**
 * Initializes a new instance of bus
 */
export const initializeBus = async (): Promise<void> => {
  if (!!busInstance) {
    throw new Error("Bus has already been initialized");
  }

  try {
    busInstance = await Bus.configure()
      .withWorkflow(DripWorkflow)
      .withHandler(startDripWorkflowHandler)
      .withHandler(emailMaintenanceTeamHandler)
      // .withCustomHandler(
      //   customHandler,
      //   {
      //     resolveWith: (event) => {
      //      try {
      //       const data = (event as any)?.data;
      //       // console.log(typeof data)
      //       if(data) {
      //         const parsed = JSON.parse(typeof data === "string" ? data : "{}");
      //         return parsed["$name"] === "bus-started/start-siren-test"
      //       }
      //      } catch (error) {
      //       console.log({error})
      //       return false;
      //      }

      //      return false
      //     },
      //   }
      // )
      .withCustomHandler(
        customDelayHandler,
        {
          resolveWith: (event) => {
           try {
            const data = (event as any)?.data;
            if(data) {
              const parsed = JSON.parse((event as any)?.data);
              return parsed["type"] === "delay"
            }
           } catch (error) {
            console.log({error})
            return false;
           }

           return false
          },
        }
      )
      .withHandler(customCommandHandler)
      .withTransport(rabbitMq)
      .withPersistence(postgresPersistence)
      .initialize();
  } catch (error) {
    explainInitializationError(error);
    throw error;
  }

  await busInstance.start();
};

/**
 * Disposes and removes the current bus instance
 */
export const disposeBus = async () => {
  if (!busInstance) {
    throw new Error("Cannot dispose bus as it has not been initialized");
  }
  await busInstance.dispose();
  busInstance = undefined;
};

/**
 * Gets the initialized bus instance
 */
export const bus = (): BusInstance => {
  if (!busInstance) {
    throw new Error(
      "Bus has not been initialized, call initializeBus() first."
    );
  }
  return busInstance;
};