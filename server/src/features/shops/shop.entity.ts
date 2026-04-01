import { Entity } from 'typeorm';
import { PlaceWithCard } from '../places/place.entity';

@Entity('shops')
export class Shop extends PlaceWithCard {}
