import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WorkItemAssignmentCreatedEvent } from '../events/work-item-assignment-created.event';

@Injectable()
export class AssignmentNotificationListener {
  @OnEvent('work-item.assignment.created')
  async handle(event: WorkItemAssignmentCreatedEvent) {
    // send notification
  }
}
