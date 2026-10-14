import { Column, Entity, OneToMany } from 'typeorm';
import { PlaceWithUser } from '../places/place.entity';
import { TownUser } from './town-user.entity';

@Entity('towns')
export class Town extends PlaceWithUser {
  @Column({ default: 1 })
  level: number;

  @OneToMany(() => TownUser, (townUser) => townUser.town)
  townUsers: TownUser[];
}
