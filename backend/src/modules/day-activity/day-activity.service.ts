import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayActivity } from './entities/day-activity.entity';
import { CreateDayActivityDto } from './dto/create-day-activity.dto';
import { UpdateDayActivityDto } from './dto/update-day-activity.dto';

@Injectable()
export class DayActivityService {
  constructor(
    @InjectRepository(DayActivity)
    private readonly dayActivityRepository: Repository<DayActivity>,
  ) {}

  async findAll(planId: string, dayId: string) {
    return await this.dayActivityRepository.find({
      where: { day: { id: dayId, plan: { id: planId } } },
    });
  }

  async findOne(planId: string, dayId: string, activityId: string) {
    const activity = await this.dayActivityRepository.findOne({
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
    createDayActivityDto: CreateDayActivityDto,
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
    updateDayActivityDto: UpdateDayActivityDto,
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
