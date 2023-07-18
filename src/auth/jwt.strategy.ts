import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cat } from '../cats/entities/cat.entity';
import { Repository } from 'typeorm';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { RedisCacheService } from 'src/db/redis-cache.service';
export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    private readonly redisCacheService: RedisCacheService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      expiresIn: Number.MAX_SAFE_INTEGER,
      secretOrKey: 'slr123456',
      passReqToCallback: true,
    } as StrategyOptions);
  }
  async validate(req, user: Cat) {
    //user是token解析后的数据 拿到解析后的数据里面有id 在更具id能够查到对应的用户信息
    console.log(user, '-------------->');
    let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    //在验证token时， 从redis中取token，如果取不到token，可能是token已过期。
    const cacheToken = await this.redisCacheService.cacheGet(`${user.id}&${user.name}&${user.role}`)
    console.log(cacheToken)
    if(!cacheToken){
      throw new UnauthorizedException('token不正确')
    }
    //用户唯一登录
    //当用户登录时，每次签发的新的token,会覆盖之前的token, 判断redis中的token与请求传入的token是否相同， 不相同时， 可能是其他地方已登录， 提示token错误。
    if(cacheToken !== token){
      throw new UnauthorizedException('token不正确')
    }
    const exitsUser = await this.catRepository.findOne({
      where: {
        id: user.id,
      },
    });
    if(!exitsUser){
      throw new UnauthorizedException('token不正确')
    }
    this.redisCacheService.cacheSet(`${user.id}&${user.name}&${user.role}`, token, 1800)
    return exitsUser;
  }
}
