import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  readonly plan_name: string;

  @IsString()
  readonly plan_country: string;

  @IsDateString()
  readonly start_date: string;

  @IsDateString()
  readonly end_date: string;

  @IsNumber()
  readonly head_count: number;

  @IsBoolean()
  readonly plan_end: boolean;
}
