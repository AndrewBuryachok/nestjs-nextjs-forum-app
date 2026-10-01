import { World } from '@/constants/worlds';

export interface BasePlace {
  id: number;
  name: string;
  world: World;
  x: number;
  y: number;
}

export interface Place extends BasePlace {
  createdAt: Date;
}
