import { IsDecimal, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  city_name: string;

  @IsDecimal({ decimal_digits: '6,6', force_decimal: true })
  latitude: number;

  @IsDecimal({ decimal_digits: '6,6', force_decimal: true })
  longitude: number;
}
