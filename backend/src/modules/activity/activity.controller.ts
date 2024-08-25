import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('api/plans/:planId/days/:dayId/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  // 전체 조회, 카테고리별 조회, 일정/경비탭 조회
  @Get()
  findAll(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Query('category') category?: string,
  ) {
    return this.activityService.findAll(planId, dayId, category);
  }

  // 일정 탭 조회
  @Get('isActivity')
  findActivities(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
  ) {
    return this.activityService.findActivitiesByIsActivity(planId, dayId, true);
  }

  // 경비 탭 조회
  @Get('expenses')
  findActivitiesWithExpenses(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
  ) {
    return this.activityService.findActivitiesWithExpenses(planId, dayId);
  }

  // 단일 조회
  @Get(':activityId')
  findOne(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.activityService.findOne(planId, dayId, activityId);
  }

  // is_activity가 true인 활동 생성
  @Post()
  createActivity(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Body() createDayActivityDto: CreateActivityDto,
  ) {
    return this.activityService.createActivity(
      planId,
      dayId,
      createDayActivityDto,
      true,
    );
  }

  // is_activity가 false인 활동 생성
  @Post('expenses')
  createNonActivity(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Body() createDayActivityDto: CreateActivityDto,
  ) {
    return this.activityService.createActivity(
      planId,
      dayId,
      createDayActivityDto,
      false,
    );
  }

  // 단일 수정
  @Put(':activityId')
  update(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(
      planId,
      dayId,
      activityId,
      updateActivityDto,
    );
  }

  // 활동 순서 변경
  @Put(':activityId/order')
  updateOrder(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
    @Body() { order }: { order: number },
  ) {
    return this.activityService.updateActivityOrder(
      planId,
      dayId,
      activityId,
      order,
    );
  }

  // 단일 삭제
  @Delete(':activityId')
  remove(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.activityService.remove(planId, dayId, activityId);
  }
}
