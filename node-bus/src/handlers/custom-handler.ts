import { bus } from "bus";
import { SendEmail } from "messages";
import { CustomCommand } from "messages/custom-command";

class S3Event {
  readonly Records: {
    name: "aws:s3";
  };
}

export const customHandler = async (event: S3Event) => {
  // console.log("Received S3 event", { event });
  await bus().send(new CustomCommand("Hello from S3"));
};

export const customDelayHandler = async (event: any) => {
  const data = JSON.parse(event.data)
  await bus().publish(new SendEmail(data?.id, "hello email"));
};
