import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from '../shops/shop.entity';
import { Purchase } from '../purchases/purchase.entity';
import { Item, Unit } from '../../common/enums';

@Entity('goods')
export class Good {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shop_id' })
  shopId: number;

  @ManyToOne(() => Shop, { nullable: false })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

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
  price: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Purchase, (purchase) => purchase.good)
  purchases: Purchase[];
}
