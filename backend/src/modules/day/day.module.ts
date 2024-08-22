import { Module } from '@nestjs/common';
import { DayController } from './day.controller';
import { DayService } from './day.service';
import { Day } from './entities/day.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [TypeOrmModule.forFeature([Day]), PlanModule],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
