import { Entity,PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm'
import { hashPassword } from '../../utils/bcryptjs'
import { CatInfo } from '../../entities/info.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  name: string;

  @Column({length: 100, select: false})
  password: string;

  @Column({default: 'visitor'})
  role: string;

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

  @BeforeInsert()
  encryptPwd() {
    this.password = hashPassword(this.password)
  }
}
