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

@Entity('towns_chunks')
export class TownChunk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'town_id' })
  townId: number;

  @ManyToOne(() => Town, { nullable: false })
  @JoinColumn({ name: 'town_id' })
  town: Town;

  @Column()
  x: number;

  @Column()
  y: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
