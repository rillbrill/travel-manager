import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('kakao/login')
  async kakaoLogin(@Res() res: Response) {
    const clientId = this.configService.get('KAKAO_CLIENT_ID');
    const redirectUri = encodeURIComponent(
      this.configService.get('KAKAO_FE_REDIRECT_URI'),
    );
    // const redirectUri = encodeURIComponent(
    //   this.configService.get('KAKAO_REDIRECT_URI'),
    // );
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    res.redirect(kakaoAuthUrl);
  }

  @Get('kakao')
  async kakaoCallback(@Query('code') code: string) {
    try {
      const tokenData = await this.authService.getKakaoToken(code);
      const userInfo = await this.authService.getKakaoUserInfo(
        tokenData.access_token,
      );

      const user = await this.authService.findOrCreateUser(userInfo);
      const tokens = await this.authService.createTokens(user);

      return {
        message: '카카오 로그인 성공',
        user: {
          id: user.id,
          nickname: user.nickname,
          email: user.email,
        },
        ...tokens,
      };
    } catch (error) {
      console.error('카카오 로그인 에러 발생:', error);
      return { message: '카카오 로그인 실패', error: error.message };
    }
  }
}
