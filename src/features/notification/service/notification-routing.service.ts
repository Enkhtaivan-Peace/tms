import { Injectable } from '@nestjs/common';

import { NotificationRecipientResolverService } from './notification-recipient-resolver.service';

@Injectable()
export class NotificationRoutingService {
  constructor(
    private readonly recipientResolver: NotificationRecipientResolverService,
  ) {}

  async workAssigned(workItemId: number): Promise<number[]> {
    return this.recipientResolver.getParticipants(workItemId);
  }

  async workStatusChanged(
    workItemId: number,
    actorId: number,
  ): Promise<number[]> {
    const users = await this.recipientResolver.getParticipants(workItemId);

    return users.filter((id) => id !== actorId);
  }

  async commentCreated(workItemId: number, actorId: number): Promise<number[]> {
    const users = await this.recipientResolver.getParticipants(workItemId);

    return users.filter((id) => id !== actorId);
  }

  async commentUpdated(workItemId: number, actorId: number): Promise<number[]> {
    const users = await this.recipientResolver.getParticipants(workItemId);

    return users.filter((id) => id !== actorId);
  }

  async reviewRequested(workItemId: number): Promise<number[]> {
    return this.recipientResolver.getReviewers(workItemId);
  }

  async reviewCompleted(workItemId: number): Promise<number[]> {
    const owner = await this.recipientResolver.getOwner(workItemId);

    return owner ? [owner] : [];
  }
}
