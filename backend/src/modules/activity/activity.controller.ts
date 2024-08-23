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

@Controller('plans/:planId/days/:dayId/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  // 전체 조회
  @Get()
  findAll(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Query('category') category?: string,
  ) {
    if (category) {
      return this.activityService.findByCategory(planId, dayId, category);
    }
    return this.activityService.findAll(planId, dayId);
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

  // isActivity가 true인 활동 생성
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

  // isActivity가 false인 활동 생성
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
