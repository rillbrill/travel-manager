import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserType } from './model/auth.types';
import {
  CreateUserDto,
  KakaoLoginResponseDto,
  UpdateUserDto,
  UserDto,
} from './dto/auth.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  // 카카오 로그인 이후 처리
  async loginWithKakao(
    kakaoAccessToken: string,
  ): Promise<KakaoLoginResponseDto> {
    const kakaoUserInfo = await this.getKakaoUserInfo(kakaoAccessToken);

    const { kakaoId, nickname, email, profileImage } = kakaoUserInfo;

    if (!kakaoId) {
      throw new UnauthorizedException('카카오 ID를 찾을 수 없습니다.');
    }

    let user = await this.findOrCreateUser({
      socialId: kakaoId.toString(),
      type: UserType.KAKAO,
      nickname,
      email,
      profileImage,
    });

    const accessToken = this.generateAccessToken(user);
    const { refreshToken, hashedRefreshToken } =
      await this.generateRefreshToken(user);

    await this.updateUser(user.id, { refreshToken: hashedRefreshToken });

    return { user: this.toUserDto(user), accessToken, refreshToken };
  }

  // 카카오 사용자 정보 가져오기
  private async getKakaoUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw new UnauthorizedException(
        '카카오 사용자 정보를 가져오는데 실패했습니다.',
      );
    }
  }

  // DB에 사용자 정보 저장 또는 업데이트
  async findOrCreateUser(createUserDto: CreateUserDto): Promise<Users> {
    let user = await this.userRepository.findOne({
      where: { socialId: createUserDto.socialId, type: createUserDto.type },
    });

    if (!user) {
      user = this.userRepository.create(createUserDto);
    } else {
      user = this.userRepository.merge(user, createUserDto);
    }

    return this.userRepository.save(user);
  }

  // 사용자 정보 업데이트
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    await this.userRepository.update(userId, updateUserDto);
    return this.userRepository.findOne({ where: { id: userId } });
  }

  // 액세스 토큰 생성
  generateAccessToken(user: Users): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
    });
  }

  // 리프레시 토큰 생성 및 암호화
  async generateRefreshToken(user: Users): Promise<{
    refreshToken: string;
    hashedRefreshToken: string;
  }> {
    const payload = { sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return { refreshToken, hashedRefreshToken };
  }

  // DB에 암호화된 리프레시 토큰 저장
  async saveRefreshToken(
    userId: number,
    hashedRefreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  // 리프레시 토큰 검증
  async validateRefreshToken(refreshToken: string): Promise<Users> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });
      if (!user || !user.refreshToken) {
        throw new ForbiddenException('유효하지 않은 리프레시 토큰입니다.');
      }
      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!isRefreshTokenValid) {
        throw new ForbiddenException('유효하지 않은 리프레시 토큰입니다.');
      }
      return user;
    } catch (error) {
      throw new ForbiddenException('유효하지 않은 리프레시 토큰입니다.');
    }
  }

  // 액세스 토큰 갱신
  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
  }> {
    const user = await this.validateRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }

    const accessToken = this.generateAccessToken(user);
    return { accessToken };
  }

  // 사용자 프로필 조회
  async getProfile(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return this.toUserDto(user);
  }

  private toUserDto(user: Users): UserDto {
    const { refreshToken, ...userWithoutRefreshToken } = user;
    return userWithoutRefreshToken;
  }

  // 리프레시 토큰 삭제
  async removeRefreshToken(userId: number) {
    await this.updateUser(userId, { refreshToken: null });
  }
}
