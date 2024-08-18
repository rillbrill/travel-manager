import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UserType } from './model/user.type';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  // 카카오 로그인 이후 처리
  async loginWithKakao(kakaoUserInfo: any) {
    console.log('Kakao user info:', JSON.stringify(kakaoUserInfo, null, 2));

    const { kakaoId, nickname, email, profileImage } = kakaoUserInfo;
    if (!kakaoId) {
      throw new UnauthorizedException('카카오 ID를 찾을 수 없습니다.');
    }

    let user = await this.findOrCreateUser(
      kakaoId.toString(),
      UserType.KAKAO,
      nickname,
      email,
      profileImage,
    );

    const accessToken = this.generateAccessToken(user);
    const { refreshToken, hashedRefreshToken } =
      await this.generateRefreshToken(user);

    await this.saveRefreshToken(user.id, hashedRefreshToken);

    return { user, accessToken, refreshToken };
  }

  // DB에 사용자 정보 저장 또는 업데이트
  async findOrCreateUser(
    socialId: string,
    type: UserType,
    nickname?: string,
    email?: string,
    profileImage?: string,
  ) {
    let user = await this.userRepository.findOne({
      where: { socialId, type },
    });

    if (!user) {
      user = this.userRepository.create({
        socialId,
        nickname,
        email,
        profileImage,
        type,
      });
    } else {
      user.nickname = nickname || user.nickname;
      user.email = email || user.email;
      user.profileImage = profileImage || user.profileImage;
    }

    await this.userRepository.save(user);
    return user;
  }

  // 액세스 토큰 생성
  generateAccessToken(user: Users) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
    });
  }

  // 리프레시 토큰 생성 및 암호화
  async generateRefreshToken(user: Users) {
    const payload = { sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return { refreshToken, hashedRefreshToken };
  }

  // DB에 암호화된 리프레시 토큰 저장
  async saveRefreshToken(userId: number, hashedRefreshToken: string) {
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  // 리프레시 토큰 검증
  async validateRefreshToken(refreshToken: string): Promise<Users> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }
      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException(
        '리프레시 토큰 검증 중 오류가 발생했습니다.',
      );
    }
  }

  // 토큰 유효성 검사
  async validateToken(token: string, isAccessToken: boolean = true) {
    try {
      const secret = isAccessToken
        ? this.configService.get('JWT_ACCESS_SECRET')
        : this.configService.get('JWT_REFRESH_SECRET');

      const payload = this.jwtService.verify(token, { secret });
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
      }

      return user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('토큰이 만료되었습니다.');
      }
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  // 액세스 토큰 갱신
  async refreshAccessToken(refreshToken: string) {
    const user = await this.validateRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }

    const accessToken = this.generateAccessToken(user);
    return { accessToken };
  }

  // 유저 정보 조회
  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }
    return {
      id: user.id,
      socialId: user.socialId,
      email: user.email,
      nickname: user.nickname,
      profileImage: user.profileImage,
      type: user.type,
    };
  }

  // 로그아웃 시 리프레시 토큰 삭제
  async removeRefreshTokenOnLogout(userId: number) {
    await this.userRepository.update(userId, { refreshToken: null });
  }
}
