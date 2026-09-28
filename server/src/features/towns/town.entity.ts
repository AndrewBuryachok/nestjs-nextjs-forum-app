import { Entity } from 'typeorm';
import { PlaceWithUser } from '../places/place.entity';

@Entity('towns')
export class Town extends PlaceWithUser {}
