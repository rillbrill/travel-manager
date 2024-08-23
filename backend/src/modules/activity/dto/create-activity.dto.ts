import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

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

  @IsBoolean()
  readonly isActivity: boolean;

  @IsString()
  @IsOptional()
  readonly category?: string;

  @IsInt()
  @IsOptional()
  readonly order?: number;
}
