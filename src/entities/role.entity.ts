import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable,  Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Permission } from './permission.entity'
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  //多对多关联
  @ManyToMany(() => Permission)
  //JoinTable创建一个新的id关联表
  @JoinTable({
    name: 'role_permission',
  })
  permission: Permission[]
}
