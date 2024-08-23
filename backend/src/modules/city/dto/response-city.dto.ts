import { IsOptional, IsString } from "class-validator";

export class CityResDto {
    @IsString()
    city_name: string;

    @IsString()
    @IsOptional()
    country_name?: String;
}