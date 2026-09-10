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

@Entity('fines')
export class Fine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sender_user_id' })
  senderUserId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'sender_user_id' })
  senderUser: User;

  @Column({ name: 'sender_card_id' })
  senderCardId: number;

  @ManyToOne(() => Card, { nullable: false })
  @JoinColumn({ name: 'sender_card_id' })
  senderCard: Card;

  @Column({ name: 'receiver_user_id' })
  receiverUserId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'receiver_user_id' })
  receiverUser: User;

  @Column({ name: 'receiver_card_id', nullable: true })
  receiverCardId?: number;

  @ManyToOne(() => Card, { nullable: true })
  @JoinColumn({ name: 'receiver_card_id' })
  receiverCard?: Card;

  @Column()
  sum: number;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamptz', name: 'paid_at', nullable: true })
  paidAt?: Date;
}
