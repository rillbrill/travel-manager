import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '카카오 로그인 후 사용자 정보 및 JWT 토큰 반환',
  })
  @ApiResponse({
    status: 200,
    description: '카카오 로그인 성공 및 사용자 정보, JWT 토큰 반환',
  })
  @ApiResponse({
    status: 400,
    description: '카카오 로그인 실패',
  })
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req) {
    try {
      const { user, accessToken, refreshToken } =
        await this.authService.loginWithKakao(req.user);

      return {
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
      return { message: '카카오 로그인 실패', error: error.message };
    }
  }

  @ApiOperation({ summary: '인증된 사용자의 프로필 정보 조회' })
  @ApiResponse({ status: 200, description: '사용자 프로필 정보' })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.user.id);
  }
}
