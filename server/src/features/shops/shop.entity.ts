import { Entity } from 'typeorm';
import { PlaceWithUserAndCard } from '../places/place.entity';

@Entity('shops')
export class Shop extends PlaceWithUserAndCard {}
