import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
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

  async findAll(planId: string, dayId: string, category?: string) {
    const queryBuilder = this.activityRepository
      .createQueryBuilder('activity')
      .leftJoin('activity.day', 'day')
      .leftJoin('day.plan', 'plan')
      .where('day.id = :dayId', { dayId })
      .andWhere('plan.id = :planId', { planId });

    if (category) {
      queryBuilder.andWhere('activity.category = :category', { category });
    }

    queryBuilder.orderBy('activity.order', 'ASC');

    return await queryBuilder.getMany();
  }

  async findActivitiesByIsActivity(
    planId: string,
    dayId: string,
    isActivity: boolean,
  ) {
    return await this.activityRepository.find({
      where: {
        day: { id: dayId, plan: { id: planId } },
        is_activity: isActivity,
      },
      order: { order: 'ASC' },
    });
  }

  async findActivitiesWithExpenses(planId: string, dayId: string) {
    return await this.activityRepository.find({
      where: {
        day: { id: dayId, plan: { id: planId } },
        activity_expenses: MoreThan(0),
      },
      order: { order: 'ASC' },
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

  async findByCategory(planId: string, dayId: string, category: string) {
    return await this.activityRepository.find({
      where: { day: { id: dayId, plan: { id: planId } }, category },
      order: { order: 'ASC' }, // order 컬럼을 오름차순으로 정렬
    });
  }

  private async updatePlanTotalExpenses(planId: string) {
    const { sum } = await this.activityRepository
      .createQueryBuilder('activity')
      .select('SUM(activity.activity_expenses)', 'sum')
      .leftJoin('activity.day', 'day')
      .leftJoin('day.plan', 'plan')
      .where('plan.id = :planId', { planId })
      .getRawOne();

    // PlanService를 사용해 총 비용 업데이트
    await this.planService.updateExpenses(planId, sum || 0);
  }

  async createActivity(
    planId: string,
    dayId: string,
    createDayActivityDto: CreateActivityDto,
    isActivity: boolean,
  ) {
    const maxOrderResult = await this.activityRepository
      .createQueryBuilder('activity')
      .select('MAX(activity.order)', 'maxOrder')
      .where('activity.day_id = :dayId', { dayId })
      .getRawOne();

    const maxOrder = maxOrderResult.maxOrder;
    const newOrder = maxOrder ? maxOrder + 1 : 1;

    const dayActivity = this.activityRepository.create({
      ...createDayActivityDto,
      day: { id: dayId, plan: { id: planId } },
      is_activity: isActivity,
      order: newOrder,
    });

    const savedActivity = await this.activityRepository.save(dayActivity);

    await this.updatePlanTotalExpenses(planId);

    return savedActivity;
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
    const updatedActivity = await this.activityRepository.save(activity);

    await this.updatePlanTotalExpenses(planId);

    return updatedActivity;
  }

  async updateActivityOrder(
    planId: string,
    dayId: string,
    activityId: string,
    newOrder: number,
  ) {
    // 현재 활동들의 순서를 가져오기
    const existingActivities = await this.activityRepository.find({
      where: { day: { id: dayId, plan: { id: planId } } },
      order: { order: 'ASC' },
    });

    // 새로운 활동 순서가 유효한 범위인지 확인
    const maxOrder = existingActivities.length;
    newOrder = Math.max(1, Math.min(newOrder, maxOrder)); // 순서를 1부터 maxOrder까지로 제한

    // 현재 순서를 가진 활동이 존재하는지 확인
    const activityToUpdate = existingActivities.find(
      (activity) => activity.id === activityId,
    );

    if (!activityToUpdate) {
      throw new NotFoundException(`Activity with ID ${activityId} not found`);
    }

    // 기존 순서값을 업데이트하기 위한 새로운 순서값
    const currentOrder = activityToUpdate.order;

    // 활동의 순서를 조정하기 위한 새로운 순서값
    if (currentOrder !== newOrder) {
      // 중복 순서값을 가진 활동들을 조정
      await this.activityRepository
        .createQueryBuilder()
        .update(Activity)
        .set({ order: () => 'order + 1' })
        .where('day.id = :dayId', { dayId })
        .andWhere('order >= :newOrder', { newOrder })
        .execute();
    }

    // 순서값 업데이트
    await this.activityRepository.update(activityId, { order: newOrder });

    return { success: true };
  }

  async remove(planId: string, dayId: string, activityId: string) {
    const activity = await this.findOne(planId, dayId, activityId);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${activityId} not found`);
    }

    await this.activityRepository.remove(activity);

    await this.updatePlanTotalExpenses(planId);
  }
}
