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

  @Column({ name: 'is_online', default: false })
  isOnline: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'online_at' })
  onlineAt: Date;
}
