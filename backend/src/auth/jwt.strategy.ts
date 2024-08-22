import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.getProfile(payload.sub);
      if (!user) {
        this.logger.warn(
          `ID: ${payload.sub}에 해당하는 사용자를 찾을 수 없습니다.`,
        );
        throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
      }
      return user;
    } catch (error) {
      this.logger.error(`토큰 검증 오류: ${error.message}`);
      throw new UnauthorizedException('유효하지 않은 액세스 토큰입니다.');
    }
  }
}
