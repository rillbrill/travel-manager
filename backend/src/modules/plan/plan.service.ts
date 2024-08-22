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

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @Inject(forwardRef(() => DayService))
    private readonly dayService: DayService,
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
    return await this.planRepository.find();
  }

  async findOne(id: string): Promise<Plan> {
    const plan = await this.planRepository.findOneBy({ id });
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    await this.planRepository.update(id, updatePlanDto);
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
}
