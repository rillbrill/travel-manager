import { Module, forwardRef } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { DayModule } from '../day/day.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    forwardRef(() => DayModule),
    forwardRef(() => PlanModule),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
