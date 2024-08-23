import { IsDateString } from 'class-validator';

export class CreateDayDto {
  @IsDateString()
  readonly date: Date;
}
