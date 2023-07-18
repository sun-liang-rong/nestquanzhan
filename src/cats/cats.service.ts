import { HttpException, Injectable } from '@nestjs/common';
import { RegisterCatDto, GetCatDto, PermissionDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CatInfo } from 'src/entities/info.entity';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity'
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(CatInfo)
    private readonly catInfoRepository: Repository<CatInfo>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) {}
  async create(registerCatDto: RegisterCatDto) {
    const existUser = await this.catRepository.findOne({
      where: {
        name: registerCatDto.name,
      },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', 400);
    } else {
      const exitsRoles = await this.roleRepository.find({
        where: {
          id: In(registerCatDto.roleIds)
        }
      })
      const user = await this.catRepository.create({name: registerCatDto.name, password: registerCatDto.password, roles: exitsRoles});
      const newUser = await this.catRepository.save(user);
      return await this.catRepository.findOne({
        where: {
          id: newUser.id,
        },
      });
    }
  }
  async createPermission(permissionDto: PermissionDto){
    const name = await this.permissionRepository.findOne({
      where: {
        name: permissionDto.name
      }
    })
    console.log(name)
    if(name){
      throw new HttpException('权限字段已存在', 400);
    }
    const permission = await this.permissionRepository.create(permissionDto)
    const newPermission = await this.permissionRepository.save(permission)
    return newPermission
  }
  async createRole(role){
    console.log(role.permissionIds)
    const permission = await this.permissionRepository.find({
      where: {
        id: In(role.permissionIds)
      }
    })
    console.log(permission)
    // return permission
    const existRole = await this.roleRepository.findOne({
      where: {
        name: role.name
      }
    })
    console.log(existRole)
    if(existRole){
      throw new HttpException('角色已存在', 400);
    }
    const newRole = await this.roleRepository.create({
      name: role.name,
      permission: permission
    })
    const result = await this.roleRepository.save(newRole)
    return result;
  }
  findAll(getCatDto: GetCatDto) {
    console.log(getCatDto);
    return getCatDto;
  }

  async userInfo(req) {
    // const result = await this.catRepository
    //   .createQueryBuilder('cat')
    //   .leftJoinAndSelect('cat.info', 'catInfo')
    //   .where('cat.id = :id', { id: req.user.id })
    //   .getOne()
    //   console.log(result)
    const id = '5e95e913-0126-4467-96cb-15a72b9485c1'
    // const result = await this.catRepository.findOne({
    //   where: {
    //     id,
    //   },
    // })
    // const catInfo = {
    //   email: '2222',
    //   phone: '2222',
    //   address: '2222',
    //   avatar: '2222',
    //   cat: result,
    // }
    // const catinfo = await this.catInfoRepository.save(catInfo)
    // result.info = catinfo
    // const data = await this.catRepository.save(result)
    // console.log(data)
    const result = await this.catRepository.
    createQueryBuilder('cat').
    leftJoinAndSelect('cat.info', 'catInfo').
    where('cat.id = :id', { id }).
    getOne()
    // const catInfo = await this.catInfoRepository.save({
    //   meail: '2222',

    return result;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
