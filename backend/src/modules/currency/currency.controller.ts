import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class ConversionResponse {
  @ApiProperty({
    description: '원래 통화 정보',
    example: { code: 'USD', value: 100.5 },
  })
  original: { code: string; value: number };

  @ApiProperty({
    description: '변환된 통화 정보',
    example: { code: 'KRW', value: 132650.25 },
  })
  converted: { code: string; value: number };
}

class ErrorResponse {
  @ApiProperty({
    description: '오류 메시지',
    example: '유효하지 않은 가격입니다.',
  })
  error: string;
}

@ApiTags('환율')
@Controller('api/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @ApiOperation({
    summary: '통화 변환',
    description: '지정된 통화 금액을 다른 통화로 변환합니다.',
  })
  @ApiQuery({
    name: 'from',
    description: '변환할 원래 통화 코드',
    type: String,
    required: true,
    example: 'USD',
  })
  @ApiQuery({
    name: 'to',
    description: '변환 대상 통화 코드',
    type: String,
    required: true,
    example: 'KRW',
  })
  @ApiQuery({
    name: 'amount',
    description: '변환할 금액',
    type: Number,
    required: true,
    example: 100.5,
  })
  @ApiResponse({
    status: 200,
    description: '변환 성공',
    type: ConversionResponse,
  })
  @ApiResponse({
    status: 400,
    description: '유효하지 않은 입력',
    type: ErrorResponse,
  })
  @Get()
  async convertCurrency(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: string,
  ) {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return { error: '유효하지 않은 금액입니다.' };
    }

    try {
      const convertedAmount = await this.currencyService.convertCurrency(
        from,
        to,
        numericAmount,
      );
      return {
        original: {
          code: from,
          value: numericAmount,
        },
        converted: {
          code: to,
          value: convertedAmount,
        },
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
