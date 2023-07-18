import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'
import { LocalStorage } from './local.strategy'
import { Cat } from '../cats/entities/cat.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { JwtStorage } from './jwt.strategy';
import { RoleGuard } from './role.guard';
import { RedisCacheModule } from 'src/db/redis-cache.module';
//secret 私钥
const jwtModule = JwtModule.register({
  secret:"slr123456",
  signOptions: { expiresIn: '4h' },
})
@Module({
  imports: [TypeOrmModule.forFeature([Cat]),PassportModule, jwtModule, RedisCacheModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage, RoleGuard],
  exports: [jwtModule]
})
export class AuthModule {}
