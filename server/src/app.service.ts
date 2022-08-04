import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('RABBITMQ') private readonly rabbitMQ: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getMessage(data: any): void {
    // console.log('hello from service', this.rabbitMQ);
    // this.rabbitMQ.emit('get-message', '{"id":"ee7d7764-3e18-4a78-9726-43ade8ee0f55","$name":"bus-started/start-siren-test","$version":0}')
  }

  workflowStarted(data: any): void {
    console.log('workflowStarted:spinning up a job worker with BullJS (example)', data)
    setTimeout(() => {
      this.rabbitMQ.emit('delay-finished', JSON.stringify({ type: "delay", id: data }))
    }, 15000)
  }
}
