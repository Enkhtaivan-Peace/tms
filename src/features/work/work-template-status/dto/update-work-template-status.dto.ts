import { PartialType } from '@nestjs/mapped-types';

import { CreateWorkTemplateStatusDto } from './create-work-template-status.dto';

export class UpdateWorkTemplateStatusDto extends PartialType(
  CreateWorkTemplateStatusDto,
) {}
