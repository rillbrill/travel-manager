import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayModule } from '../day/day.module';
import { Activity } from './entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), DayModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
