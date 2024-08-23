import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { Between, Repository } from 'typeorm';
import { Day } from './entities/day.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanService } from '../plan/plan.service';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
    @Inject(forwardRef(() => PlanService))
    private readonly planService: PlanService,
  ) {}

  async create(planId: string, createDayDto: CreateDayDto) {
    // Plan 엔티티를 가져옴
    const plan = await this.planService.findOne(planId);

    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    // Day 엔티티를 생성하고 plan 속성에 Plan 엔티티를 설정
    const day = this.dayRepository.create({ ...createDayDto, plan });

    return await this.dayRepository.save(day);
  }

  async findAll(planId: string) {
    return await this.dayRepository.find({ where: { plan: { id: planId } } });
  }

  async findOne(planId: string, id: string) {
    return await this.dayRepository.findOne({
      where: { id, plan: { id: planId } },
    });
  }

  async findAllByPlanId(planId: string) {
    return this.dayRepository.find({
      where: { plan: { id: planId } },
      relations: ['activities'], // Activity와 함께 로드
      order: { date: 'ASC' }, // Day를 날짜 순으로 정렬
    });
  }

  async update(planId: string, id: string, updateDayDto: UpdateDayDto) {
    const day = await this.dayRepository.findOne({
      where: { id, plan: { id: planId } },
    });

    if (!day) {
      throw new NotFoundException(`Day with ID ${id} not found`);
    }

    Object.assign(day, updateDayDto);
    return await this.dayRepository.save(day);
  }

  async remove(planId: string, id: string) {
    const day = await this.dayRepository.findOne({
      where: { id, plan: { id: planId } },
    });

    if (!day) {
      throw new NotFoundException(`Day with ID ${id} not found`);
    }

    return await this.dayRepository.remove(day);
  }

  async findByDate(planId: string, date: string) {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }

    // Start and end of the day in local time
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    return await this.dayRepository.find({
      where: {
        plan: { id: planId },
        date: Between(startOfDay, endOfDay),
      },
    });
  }
}
