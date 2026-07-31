import { PartialType } from '@nestjs/swagger';
import { CreateWorkTypeDto } from '../../work-type/dto/create-work-type.dto';

export class UpdateWorkTypeDto extends PartialType(CreateWorkTypeDto) {}
