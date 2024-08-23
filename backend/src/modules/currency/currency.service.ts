import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async convertCurrency(
    fromCode: string,
    toCode: string,
    amount: number,
  ): Promise<number> {
    const apiKey = this.configService.get<string>('CURRENCY_API_KEY');
    const url = `https://open.er-api.com/v6/latest/${fromCode}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: { apikey: apiKey },
        }),
      );

      const rate = response.data.rates[toCode];
      if (!rate) {
        throw new Error(`환율 정보를 찾을 수 없습니다: ${toCode}`);
      }

      return amount * rate;
    } catch (error) {
      console.error('환율 변환 중 오류 발생:', error);
      throw new Error('환율 정보를 가져오는 데 실패했습니다');
    }
  }
}
