import { PartialType } from '@nestjs/mapped-types';

import { CreateWorkStatusTransitionDto } from './create-work-status-transition.dto';

export class UpdateWorkStatusTransitionDto extends PartialType(
  CreateWorkStatusTransitionDto,
) {}
