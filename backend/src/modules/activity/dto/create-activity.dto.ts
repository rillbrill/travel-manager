import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  readonly activity_name: string;

  @IsString()
  @IsOptional()
  readonly detail?: string;

  @IsString()
  @IsOptional()
  readonly activity_location?: string;

  @IsInt()
  @IsOptional()
  readonly activity_expenses?: number;

  @IsString()
  @IsOptional()
  readonly category?: string;

  @IsInt()
  @IsOptional()
  readonly order?: number;
}
