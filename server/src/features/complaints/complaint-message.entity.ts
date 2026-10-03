import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Complaint } from './complaint.entity';
import { User } from '../users/user.entity';

@Entity('complaints_messages')
export class ComplaintMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'complaint_id' })
  complaintId: number;

  @ManyToOne(() => Complaint, { nullable: false })
  @JoinColumn({ name: 'complaint_id' })
  complaint: Complaint;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}
