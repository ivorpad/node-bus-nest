import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const RabbitMQProvider = {
  provide: 'RABBITMQ',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: '@app/my-queue',
        queueOptions: {
          arguments: {
            'x-dead-letter-exchange': '@app/my-queue-retry',
            'x-dead-letter-routing-key': 'retry',
          }
        }
      }
    })
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RabbitMQProvider],
})
export class AppModule {}
