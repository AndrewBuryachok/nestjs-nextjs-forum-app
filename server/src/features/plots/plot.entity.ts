import { Column, Entity, OneToMany } from 'typeorm';
import { PlaceWithUserAndCard } from '../places/place.entity';
import { Rent } from '../rents/rent.entity';

@Entity('plots')
export class Plot extends PlaceWithUserAndCard {
  @Column()
  price: number;

  @OneToMany(() => Rent, (rent) => rent.plot)
  rents: Rent[];
}
