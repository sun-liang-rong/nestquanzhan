import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from 'src/db/redis-cache.service';
@Injectable()
export class AuthService {
  constructor(private readonly JwtService:JwtService, private readonly redisCacheService: RedisCacheService){}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  createToken(user){
    return this.JwtService.sign(user)
  }
  async login(user:any){
    console.log(user)
    const token = this.createToken({
      id: user.id,
      name: user.name,
      role: user.role
    })
    for(let key in user){
      user.token = token
    }
    //在登录时，将jwt生成的token，存入redis,并设置有效期为30分钟。存入redis的key由用户信息组成， value是token值。
    await this.redisCacheService.cacheSet( `${user.id}&${user.name}&${user.role}`, token, 1800)
    return user
  }
  findAll(req) {
    return req;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
