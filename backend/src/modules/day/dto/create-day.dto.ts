import { IsDateString, IsString } from 'class-validator';

export class CreateDayDto {
  @IsDateString()
  readonly date: Date;

  @IsString()
  readonly day_city: string;

  @IsString()
  readonly day_loc: string;
}
