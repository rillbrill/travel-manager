import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DayActivityService } from './day-activity.service';
import { CreateDayActivityDto } from './dto/create-day-activity.dto';
import { UpdateDayActivityDto } from './dto/update-day-activity.dto';

@Controller('plans/:planId/days/:dayId/activities')
export class DayActivityController {
  constructor(private readonly dayActivityService: DayActivityService) {}

  // 전체 조회
  @Get()
  findAll(@Param('planId') planId: string, @Param('dayId') dayId: string) {
    return this.dayActivityService.findAll(planId, dayId);
  }

  // 단일 조회
  @Get(':activityId')
  findOne(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.dayActivityService.findOne(planId, dayId, activityId);
  }

  // 단일 생성
  @Post()
  create(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Body() createDayActivityDto: CreateDayActivityDto,
  ) {
    return this.dayActivityService.create(planId, dayId, createDayActivityDto);
  }

  // 단일 수정
  @Put(':activityId')
  update(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
    @Body() updateDayActivityDto: UpdateDayActivityDto,
  ) {
    return this.dayActivityService.update(
      planId,
      dayId,
      activityId,
      updateDayActivityDto,
    );
  }

  // 단일 삭제
  @Delete(':activityId')
  remove(
    @Param('planId') planId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.dayActivityService.remove(planId, dayId, activityId);
  }
}
