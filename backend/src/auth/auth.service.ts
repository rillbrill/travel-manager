import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async getKakaoToken(code: string) {
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.configService.get('KAKAO_CLIENT_ID'),
      // redirect_uri: this.configService.get('KAKAO_REDIRECT_URI'),
      redirect_uri: this.configService.get('KAKAO_FE_REDIRECT_URI'),
      code,
    });

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(tokenUrl, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }),
      );
      // console.log(data);
      return data;
    } catch (error) {
      console.error('카카오 토큰을 가져오는 데 실패했습니다.', error);
      throw error;
    }
  }

  async getKakaoUserInfo(accessToken: string) {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(userInfoUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
      return data;
    } catch (error) {
      console.error('카카오 사용자 정보를 가져오는 데 실패했습니다.', error);
      throw error;
    }
  }

  async findOrCreateUser(kakaoUserInfo: any) {
    let user = await this.userRepository.findOne({
      where: { kakaoId: kakaoUserInfo.id },
    });

    if (!user) {
      user = this.userRepository.create({
        kakaoId: kakaoUserInfo.id,
        nickname: kakaoUserInfo.properties.nickname,
        profileImage: kakaoUserInfo.properties.profile_image,
        email: kakaoUserInfo.kakao_account.email,
      });
      await this.userRepository.save(user);
    }

    return user;
  }

  async createTokens(user: Users) {
    const payload = { sub: user.id, username: user.nickname };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
    });
    // 리프레시 토큰 업데이트
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }
}
