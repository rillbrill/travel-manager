import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/users.entity';

export class UserDto extends OmitType(Users, ['refreshToken'] as const) {}

export class CreateUserDto extends PickType(Users, [
  'socialId',
  'type',
  'email',
  'nickname',
  'profileImage',
] as const) {}

export class UpdateUserDto extends PartialType(
  OmitType(Users, ['id', 'socialId', 'type'] as const),
) {}

export class KakaoLoginResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export class AccessTokenResponseDto {
  accessToken: string;
}
