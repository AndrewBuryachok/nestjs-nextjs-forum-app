import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Town } from './town.entity';
import { User } from '../users/user.entity';

@Entity('towns_users')
export class TownUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'town_id' })
  townId: number;

  @ManyToOne(() => Town, { nullable: false })
  @JoinColumn({ name: 'town_id' })
  town: Town;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
