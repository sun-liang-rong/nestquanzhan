import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Cat } from 'src/cats/entities/cat.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

//定义一个授权守卫
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
    //查询当前用户 然后关联查询用户的角色  和 角色对应的权限
    const userAndRole = await this.catRepository.findOne({
      where: {
        id: user.id
      },
      relations: ['roles', 'roles.permission']
    })
    // flatMap是将每个角色的权限合并成一个完成的权限数组
    const permissions = userAndRole.roles.flatMap((role) => role.permission);
    // 拿到每个权限的名字
    const permissionNames = permissions.map((item) => item.name);
    console.log(permissionNames, 'role')
    //判断用户角色是否包含喝roles相同的角色列表, 并返回一个布尔类型
    //路由的权限 和 用户的权限进行对比
    // 判断用户权限数组的名字里面是否有 路由控制器上面的权限名字 如果有 就是权限校验通过
    const hasRoles = roles.some(role => permissionNames.includes(role))
    console.log(hasRoles, 'hasRoles')
    return hasRoles
  }
}
//这个Roles里面接受的参数 对应路由上的@Roles('admin') SetMetadata('key', '元数据')
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);