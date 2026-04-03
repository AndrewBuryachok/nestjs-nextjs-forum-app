import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Locker } from '../lockers/locker.entity';
import { Item, Status, Unit } from '../../common/enums';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'locker_id' })
  lockerId: number;

  @ManyToOne(() => Locker, { nullable: false })
  @JoinColumn({ name: 'locker_id' })
  locker: Locker;

  @Column({ name: 'customer_user_id' })
  customerUserId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'customer_user_id' })
  customerUser: User;

  @Column({ name: 'customer_card_id' })
  customerCardId: number;

  @ManyToOne(() => Card, { nullable: false })
  @JoinColumn({ name: 'customer_card_id' })
  customerCard: Card;

  @Column({ type: 'enum', enum: Item })
  item: Item;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  batch: number;

  @Column({ type: 'enum', enum: Unit })
  unit: Unit;

  @Column()
  sum: number;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'executor_user_id', nullable: true })
  executorUserId?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'executor_user_id' })
  executorUser?: User;

  @Column({ name: 'executor_card_id', nullable: true })
  executorCardId?: number;

  @ManyToOne(() => Card, { nullable: true })
  @JoinColumn({ name: 'executor_card_id' })
  executorCard?: Card;

  @Column({ type: 'timestamptz', name: 'completed_at', nullable: true })
  completedAt?: Date;
}
