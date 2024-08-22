import { Module } from '@nestjs/common';
import { DayActivityController } from './day-activity.controller';
import { DayActivityService } from './day-activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayModule } from '../day/day.module';
import { DayActivity } from './entities/day-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DayActivity]), DayModule],
  controllers: [DayActivityController],
  providers: [DayActivityService],
})
export class DayActivityModule {}
