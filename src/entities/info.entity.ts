import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm'
import { Cat } from '../cats/entities/cat.entity';
@Entity()
export class CatInfo {
  
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({length: 100})
  email: string;

  @Column({length: 100})
  phone: string;

  @Column({length: 100})
  avatar: string;

  @Column({length: 100})
  address: string;

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
  @OneToOne(type => Cat, cat => cat.info)
  @JoinColumn()
  cat: Cat;
}