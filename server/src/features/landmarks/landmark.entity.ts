import { Entity } from 'typeorm';
import { PlaceWithUser } from '../places/place.entity';

@Entity('landmarks')
export class Landmark extends PlaceWithUser {}
