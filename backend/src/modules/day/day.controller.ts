import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

@Controller('api/plans/:planId/days')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  // 특정 플랜에 새 일정 생성
  @Post()
  create(@Param('planId') planId: string, @Body() createDayDto: CreateDayDto) {
    return this.dayService.create(planId, createDayDto);
  }

  // 특정 플랜의 모든 일정 조회, 날짜 별 조회
  @Get()
  findAll(@Param('planId') planId: string, @Query('date') date?: string) {
    if (date) {
      return this.dayService.findByDate(planId, date); // 날짜 별 조회
    }
    return this.dayService.findAll(planId); // 모든 일정 조회
  }

  // 특정 플랜의 특정 일정을 ID로 조회
  @Get(':id')
  findOne(@Param('planId') planId: string, @Param('id') id: string) {
    return this.dayService.findOne(planId, id);
  }

  // 특정 플랜의 특정 일정 수정
  @Put(':id')
  update(
    @Param('planId') planId: string,
    @Param('id') id: string,
    @Body() updateDayDto: UpdateDayDto,
  ) {
    return this.dayService.update(planId, id, updateDayDto);
  }

  // 특정 플랜의 특정 일정 삭제
  @Delete(':id')
  remove(@Param('planId') planId: string, @Param('id') id: string) {
    return this.dayService.remove(planId, id);
  }
}
