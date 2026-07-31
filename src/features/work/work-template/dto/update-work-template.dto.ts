import { PartialType } from '@nestjs/mapped-types';

import { CreateWorkTemplateDto } from './create-work-template.dto';

export class UpdateWorkTemplateDto extends PartialType(CreateWorkTemplateDto) {}
