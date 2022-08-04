import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('get-message')
  getMessage(@Payload() data): void {
    this.appService.getMessage(data);
  }

  @MessagePattern('workflow-started')
  workflowStarted(@Payload() data): void {
    console.info('origin:workflowStarted', data)
    this.appService.workflowStarted(data.workflow_id);
  }


}
