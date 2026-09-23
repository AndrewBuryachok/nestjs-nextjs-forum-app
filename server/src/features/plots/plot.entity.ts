import { Column, Entity } from 'typeorm';
import { PlaceWithUserAndCard } from '../places/place.entity';

@Entity('plots')
export class Plot extends PlaceWithUserAndCard {
  @Column()
  price: number;
}
