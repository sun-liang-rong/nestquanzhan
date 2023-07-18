import { HttpException, Injectable } from '@nestjs/common';
import { RegisterCatDto, GetCatDto, PermissionDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatInfo } from 'src/entities/info.entity';
import { Permission } from 'src/entities/permission.entity';
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(CatInfo)
    private readonly catInfoRepository: Repository<CatInfo>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
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
      const user = await this.catRepository.create(registerCatDto);
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
