import { PartialType } from '@nestjs/swagger';

import { CreateWorkTypeDto } from './assign-work-item.dto';

export class UpdateWorkTypeDto extends PartialType(CreateWorkTypeDto) {}
