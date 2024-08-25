import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { DayService } from '../day/day.service';
import { Country } from '../country/entities/country.entity';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @Inject(forwardRef(() => DayService))
    private readonly dayService: DayService,
    @Inject(forwardRef(() => ActivityService))
    private readonly activityService: ActivityService,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const { start_date, end_date, ...rest } = createPlanDto;

    // Plan 엔티티 생성 및 저장
    const plan = this.planRepository.create({
      ...rest,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
    });

    const savedPlan = await this.planRepository.save(plan);

    // start_date부터 end_date까지의 날짜를 기반으로 Day 엔티티 생성
    const currentDate = new Date(start_date);
    const endDate = new Date(end_date);

    while (currentDate <= endDate) {
      await this.dayService.create(savedPlan.id, {
        date: new Date(currentDate),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return savedPlan;
  }

  async findAll(): Promise<Plan[]> {
    return await this.planRepository.find({
      order: {
        plan_end: 'ASC',
        start_date: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Plan> {
    const plan = await this.planRepository.findOneBy({ id });
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return plan;
  }

  async findAllDaysAndActivities(planId: string) {
    const plan = await this.planRepository.findOne({ where: { id: planId } });

    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    const days = await this.dayService.findAllByPlanId(planId);

    const result = await Promise.all(
      days.map(async (day) => {
        const activities =
          await this.activityService.findActivitiesByIsActivity(
            planId,
            day.id,
            true, // is_activity가 true인 활동만 조회
          );
        return {
          ...day,
          activities: activities.sort((a, b) => a.order - b.order),
        };
      }),
    );

    return result;
  }

  async getCurrencyCode(planId: string): Promise<string> {
    // planId를 사용해 Plan을 찾음
    const plan = await this.planRepository.findOne({ where: { id: planId } });
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    // plan_country에서 국가명 추출
    const countryName = plan.plan_country.split(' ')[0];

    // country_name으로 Country 엔티티 검색
    const country = await this.countryRepository.findOne({
      where: { country_name: countryName },
    });

    if (!country) {
      throw new NotFoundException(`Country with name ${countryName} not found`);
    }

    // currency_code 반환
    return country.currency_code;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const existingPlan = await this.findOne(id);

    const { start_date, end_date, ...rest } = updatePlanDto;

    if (start_date || end_date) {
      // 기존 날짜 범위에서 벗어난 날짜의 Day 삭제
      const oldDays = await this.dayService.findAll(id);
      const newStartDate = new Date(start_date || existingPlan.start_date);
      const newEndDate = new Date(end_date || existingPlan.end_date);

      for (const day of oldDays) {
        const dayDate = new Date(day.date);
        if (dayDate < newStartDate || dayDate > newEndDate) {
          await this.dayService.remove(id, day.id); // Day 삭제 시, 연동된 Activity도 함께 삭제됨
        }
      }

      // 새로 추가된 날짜의 Day 추가
      const currentDate = newStartDate;
      while (currentDate <= newEndDate) {
        const dayExists = oldDays.some(
          (day) =>
            new Date(day.date).toISOString().split('T')[0] ===
            currentDate.toISOString().split('T')[0],
        );
        if (!dayExists) {
          await this.dayService.create(id, { date: currentDate });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    await this.planRepository.update(id, { ...rest, start_date, end_date });
    const updatedPlan = await this.findOne(id);
    if (!updatedPlan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return updatedPlan;
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.planRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
  }

  async updateExpenses(planId: string, totalExpenses: number): Promise<void> {
    await this.planRepository.update(planId, { total_expenses: totalExpenses });
  }
}
