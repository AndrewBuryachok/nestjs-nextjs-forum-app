import { Entity } from 'typeorm';
import { PlaceWithUserAndCard } from '../places/place.entity';

@Entity('markets')
export class Market extends PlaceWithUserAndCard {}
