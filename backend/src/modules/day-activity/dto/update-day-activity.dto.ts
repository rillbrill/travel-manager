import { PartialType } from '@nestjs/swagger';
import { CreateDayActivityDto } from './create-day-activity.dto';

export class UpdateDayActivityDto extends PartialType(CreateDayActivityDto) {}
