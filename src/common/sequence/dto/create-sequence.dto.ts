import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSequenceDto {
  @IsString()
  code!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  prefixLength?: number;
}
