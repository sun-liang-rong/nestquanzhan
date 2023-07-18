import { Entity,PrimaryGeneratedColumn, ManyToMany, JoinTable, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm'
import { hashPassword } from '../../utils/bcryptjs'
import { CatInfo } from '../../entities/info.entity';
import { Role } from '../../entities/role.entity';
@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  name: string;

  @Column({length: 100, select: false})
  password: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @OneToOne(type => CatInfo, catInfo => catInfo.cat)
  @JoinColumn()
  info: CatInfo;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'cat_role',
  })
  roles: Role[];
  
  @BeforeInsert()
  encryptPwd() {
    this.password = hashPassword(this.password)
  }
}
