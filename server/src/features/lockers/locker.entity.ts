import { Entity } from 'typeorm';
import { PlaceWithUser } from '../places/place.entity';

@Entity('lockers')
export class Locker extends PlaceWithUser {}
