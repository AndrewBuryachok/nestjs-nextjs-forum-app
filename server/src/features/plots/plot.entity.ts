import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Place } from '../places/place.entity';
import { Market } from '../markets/market.entity';

@Entity('plots')
export class Plot extends Place {
  @Column({ name: 'market_id' })
  marketId: number;

  @ManyToOne(() => Market, { nullable: false })
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @Column()
  price: number;

  @Column({ type: 'timestamptz', name: 'reserved_until', nullable: true })
  reservedUntil?: Date;
}
