import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Country } from '../country/entities/country.entity';
import { Repository } from 'typeorm';
import { CityResDto } from './dto/response-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    const cities = await this.cityRepository.find({ relations: ['country'] });
    return cities.map(city => this.transformToResponseDto(city));
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['country'],
    });
    if (!city) {
      return null;
    }
    return this.transformToResponseDto(city);
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }

  private transformToResponseDto(city: City): CityResDto {
    const responseDto: CityResDto = {
      city_name: city.city_name,
      country_name: city.country ? city.country.country_name : undefined,
    };
    return responseDto;
  }
}
