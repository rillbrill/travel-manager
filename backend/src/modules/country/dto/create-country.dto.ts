import { IsDecimal, IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  country_name: string;

  @IsString()
  @Length(2, 2)
  country_code: string;

  @IsString()
  @Length(3, 3)
  currency_code: string;

  @IsDecimal({ decimal_digits: '7,7', force_decimal: true })
  latitude: number;

  @IsDecimal({ decimal_digits: '7,7', force_decimal: true })
  longitude: number;
}
