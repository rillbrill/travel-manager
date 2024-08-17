import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/users.entity';

export class KakaoUserDto extends PickType(Users, [
  'id',
  'email',
  'nickname',
]) {}
