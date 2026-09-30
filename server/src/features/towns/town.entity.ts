import { Entity, OneToMany } from 'typeorm';
import { PlaceWithUser } from '../places/place.entity';
import { TownUser } from './town-user.entity';

@Entity('towns')
export class Town extends PlaceWithUser {
  @OneToMany(() => TownUser, (townUser) => townUser.town)
  townUsers: TownUser[];
}
