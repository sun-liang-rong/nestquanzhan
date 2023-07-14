import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly JwtService:JwtService){}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  createToken(user){
    return this.JwtService.sign(user)
  }
  login(user:any){
    console.log(user)
    const token = this.createToken({
      id: user.id,
      name: user.name,
    })
    for(let key in user){
      user.token = token
    }
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
