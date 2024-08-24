import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('api/plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Get(':id/all')
  findAllDaysAndActivities(@Param('id') planId: string) {
    return this.planService.findAllDaysAndActivities(planId);
  }

  @Get(':id/currency')
  async getCurrencyCode(@Param('id') id: string): Promise<string> {
    return this.planService.getCurrencyCode(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }
}
