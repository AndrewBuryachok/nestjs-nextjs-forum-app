export interface BasePlace {
  id: number;
  name: string;
  x: number;
  y: number;
}

export interface Place extends BasePlace {
  createdAt: Date;
}
