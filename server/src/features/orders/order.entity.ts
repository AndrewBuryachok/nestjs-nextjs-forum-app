import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Locker } from '../lockers/locker.entity';
import { Card } from '../cards/card.entity';
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

  @Column({ name: 'customer_card_id' })
  customerCardId: number;

  @ManyToOne(() => Card, { nullable: false })
  @JoinColumn({ name: 'customer_card_id' })
  customerCard: Card;

  @Column({ name: 'executor_card_id', nullable: true })
  executorCardId?: number | null;

  @ManyToOne(() => Card, { nullable: true })
  @JoinColumn({ name: 'executor_card_id' })
  executorCard?: Card | null;

  @Column({ type: 'enum', enum: Item, default: Item.STONE })
  item: Item;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  batch: number;

  @Column({ type: 'enum', enum: Unit, default: Unit.PIECE })
  unit: Unit;

  @Column()
  sum: number;

  @Column({ type: 'enum', enum: Status, default: Status.CREATED })
  status: Status;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamptz', name: 'completed_at', nullable: true })
  completedAt?: Date;
}
