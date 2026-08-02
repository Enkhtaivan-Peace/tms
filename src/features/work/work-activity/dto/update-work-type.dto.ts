import { PartialType } from '@nestjs/swagger';

import { CreateWorkTypeDto } from './create-work-activity.dto';

export class UpdateWorkTypeDto extends PartialType(CreateWorkTypeDto) {}
