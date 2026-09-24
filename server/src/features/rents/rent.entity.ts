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
import { Plot } from '../plots/plot.entity';

@Entity('rents')
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'plot_id' })
  plotId: number;

  @ManyToOne(() => Plot, { nullable: false })
  @JoinColumn({ name: 'plot_id' })
  plot: Plot;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'card_id' })
  cardId: number;

  @ManyToOne(() => Card, { nullable: false })
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamptz', name: 'completed_at' })
  completedAt: Date;
}
