import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cat } from '../cats/entities/cat.entity';
import { Repository } from 'typeorm';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'slr123456',
    } as StrategyOptions);
  }
  async validate(user: Cat) {
    //user是token解析后的数据 拿到解析后的数据里面有id 在更具id能够查到对应的用户信息
    console.log(user);
    const exitsUser = await this.catRepository.findOne({
      where: {
        id: user.id,
      },
    });
    console.log(exitsUser)
    if(!exitsUser){
      throw new UnauthorizedException('token不正确')
    }
    return exitsUser;
  }
}
