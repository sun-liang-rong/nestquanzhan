import { HttpException } from '@nestjs/common';
import { isOk } from '../utils/bcryptjs'
import { PassportStrategy } from '@nestjs/passport'
import { IStrategyOptions, Strategy } from 'passport-local'
import { Cat } from 'src/cats/entities/cat.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
export class LocalStorage extends PassportStrategy(Strategy){
  constructor(@InjectRepository(Cat) private readonly catRepository: Repository<Cat>){
    super({
      usernameField: 'name',
      passwordField: 'password'
    } as IStrategyOptions)
  }
  async validate(name: string, password: string){
    const user = await this.catRepository.createQueryBuilder('cat')
    .addSelect('cat.password')
    .where('cat.name = :name', {name})
    .getOne()
    if(!user){
      throw new HttpException('用户名不存在', 400)
    }
    if(!isOk(password, user.password)){
      throw new HttpException('密码错误', 400)
    }
    delete user.password
    return user
  }
}