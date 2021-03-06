import { User } from '@domain/entities/User';
import {
  Entity, PrimaryColumn, Column, ManyToOne, OneToMany,
} from 'typeorm';
import { PaperAdapter } from './PaperAdapter';
import { RoleAdapter } from './RoleAdapter';

@Entity('users')
export class UserAdapter implements User {
  @PrimaryColumn({ unique: true })
  readonly id: string

  @Column({ length: 30 })
  name: string

  @Column({ length: 255 })
  lastName: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ length: 255 })
  password: string

  @Column('timestamp with time zone')
  readonly createdAt: string

  @Column('timestamp with time zone')
  updatedAt: string

  @ManyToOne(() => RoleAdapter, (role) => role.users)
  role?: RoleAdapter;

  @OneToMany(() => PaperAdapter, (paper) => paper.user)
  papers?: PaperAdapter[];

  constructor(data: User) {
    Object.assign(this, data);
  }
}
