import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nick: string;

  @Column()
  password: string;

  @Column({ default: '' })
  token: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [] })
  roles: Role[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}
