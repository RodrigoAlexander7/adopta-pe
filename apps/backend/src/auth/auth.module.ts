import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '@/users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService, GoogleStrategy, JwtStrategy, JwtService],
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule { }
