import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PlanService } from '../plan/plan.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    @Inject(forwardRef(() => PlanService))
    private readonly planService: PlanService,
  ) {}

  async findAll(planId: string, dayId: string) {
    return await this.activityRepository.find({
      where: { day: { id: dayId, plan: { id: planId } } },
    });
  }

  async findOne(planId: string, dayId: string, activityId: string) {
    const activity = await this.activityRepository.findOne({
      where: { id: activityId, day: { id: dayId, plan: { id: planId } } },
    });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${activityId} not found`);
    }
    return activity;
  }

  async create(
    planId: string,
    dayId: string,
    createDayActivityDto: CreateActivityDto,
  ) {
    const dayActivity = this.dayActivityRepository.create({
      ...createDayActivityDto,
      day: { id: dayId, plan: { id: planId } },
    });
    return await this.dayActivityRepository.save(dayActivity);
  }

  async update(
    planId: string,
    dayId: string,
    activityId: string,
    updateDayActivityDto: UpdateActivityDto,
  ) {
    const activity = await this.findOne(planId, dayId, activityId);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${activityId} not found`);
    }
    Object.assign(activity, updateDayActivityDto);
    return await this.dayActivityRepository.save(activity);
  }

  async remove(planId: string, dayId: string, activityId: string) {
    const activity = await this.findOne(planId, dayId, activityId);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${activityId} not found`);
    }
    return await this.dayActivityRepository.remove(activity);
  }
}
