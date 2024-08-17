import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule {}
