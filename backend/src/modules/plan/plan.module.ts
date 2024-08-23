import { forwardRef, Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { DayModule } from '../day/day.module';
import { ActivityModule } from '../activity/activity.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan]),
    forwardRef(() => DayModule),
    forwardRef(() => ActivityModule),
    CountryModule,
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
