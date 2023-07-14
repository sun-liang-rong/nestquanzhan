import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
//定义一个授权守卫
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    //获取路由角色
    //这个roles是在路由上定义的规则 @Roles('admin') .get<string[]>('key', context.getHandler() 获取元数据);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles, 'roles')
    if(!roles){
      return true
    }
    //读取user 这个是获取当前用户的权限
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user, 'user')
    if(!user){
      return false
    }
    //判断用户角色是否包含喝roles相同的角色列表, 并返回一个布尔类型
    //路由的权限 和 用户的权限进行对比
    const hasRoles = roles.some(role => role === user.role)
    console.log(hasRoles, 'hasRoles')
    return hasRoles
  }
}
//这个Roles里面接受的参数 对应路由上的@Roles('admin') SetMetadata('key', '元数据')
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);