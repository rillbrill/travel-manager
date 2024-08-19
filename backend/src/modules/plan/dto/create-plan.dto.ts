import { IsBoolean, IsNumber, IsString } from 'class-validator';
export class CreatePlanDto {
    @IsString()
    plan_name: string;

    @IsString()
    plan_country: string;

    @IsNumber()
    head_count: number;

    @IsNumber()
    total_expenses: number;

    @IsBoolean()
    plan_end: boolean;
}
