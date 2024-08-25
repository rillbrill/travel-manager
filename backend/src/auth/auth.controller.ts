import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
  UnauthorizedException,
  Res,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('인증')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 인증 후 사용자 정보 및 JWT 토큰을 반환합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '카카오 로그인 성공',
    schema: {
      example: {
        statusCode: 200,
        message: '카카오 로그인 성공',
        user: {
          id: 1,
          socialId: '12345678',
          email: 'user@example.com',
          nickname: '홍길동',
          profileImage: 'https://example.com/profile.jpg',
          type: 'kakao',
        },
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '카카오 로그인 실패',
    schema: {
      example: {
        message: '카카오 로그인 실패',
        error: '에러메시지',
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        kakaoAccessToken: { type: 'string' },
      },
    },
  })
  @Post('kakao')
  // @UseGuards(AuthGuard('kakao'))
  @HttpCode(HttpStatus.OK)
  async kakaoLogin(@Body() body: { kakao_access_token: string }) {
    console.log('카카오 요청바디', body);
    try {
      const { user, accessToken, refreshToken } =
        await this.authService.loginWithKakao(body.kakao_access_token);

      return {
        statusCode: HttpStatus.OK,
        message: '카카오 로그인 성공',
        user: {
          id: user.id,
          socialId: user.socialId,
          email: user.email,
          nickname: user.nickname,
          profileImage: user.profileImage,
          type: user.type,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error('카카오 로그인 에러 발생:', error);
      return {
        message: '카카오 로그인 실패',
        error: error.message,
      };
    }
  }

  @ApiOperation({
    summary: '사용자 프로필 조회',
    description: '인증된 사용자의 프로필 정보를 조회합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '사용자 프로필 정보',
    schema: {
      example: {
        id: 1,
        socialId: '12345678',
        email: 'user@example.com',
        nickname: '홍길동',
        profileImage: 'https://example.com/profile.jpg',
        type: 'kakao',
      },
    },
  })
  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req) {
    const profile = await this.authService.getProfile(req.user.id);
    return {
      ...profile,
    };
  }

  @ApiOperation({
    summary: '사용자 로그아웃',
    description: '리프레시 토큰을 삭제하여 로그아웃 처리합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '로그아웃 성공',
    schema: {
      example: {
        message: '로그아웃 성공',
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
      },
    },
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() body: { userId: number }) {
    await this.authService.removeRefreshToken(body.userId);
    return {
      message: '로그아웃 성공',
    };
  }

  @ApiOperation({
    summary: '액세스 토큰 재발급',
    description: '리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '액세스 토큰 갱신 성공',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '유효하지 않은 리프레시 토큰',
    schema: {
      example: {
        message: '유효하지 않은 리프레시 토큰입니다.',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Body() body: { refreshToken: string }, @Res() res) {
    try {
      const { refreshToken } = body;
      if (!refreshToken) {
        throw new UnauthorizedException('리프레시 토큰이 제공되지 않았습니다.');
      }
      const { accessToken } =
        await this.authService.refreshAccessToken(refreshToken);
      return { accessToken };
    } catch (error) {
      // 로그인 페이지로 리디렉션
      const clientDomain = this.configService.get<string>('CLIENT_DOMAIN');
      return res.redirect(`${clientDomain}/login`);
    }
  }
}
