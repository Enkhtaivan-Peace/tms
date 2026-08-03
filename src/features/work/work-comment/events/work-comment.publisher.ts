import { Injectable } from '@nestjs/common';

import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  WorkCommentEventType,
  WorkCommentEventPayload,
} from './work-comment.events';

@Injectable()
export class WorkCommentEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  created(payload: WorkCommentEventPayload) {
    this.eventEmitter.emit(WorkCommentEventType.CREATED, payload);
  }

  updated(payload: WorkCommentEventPayload) {
    this.eventEmitter.emit(WorkCommentEventType.UPDATED, payload);
  }

  deleted(payload: WorkCommentEventPayload) {
    this.eventEmitter.emit(WorkCommentEventType.DELETED, payload);
  }
}
