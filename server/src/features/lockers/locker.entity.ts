import { Column, Entity, OneToMany } from 'typeorm';
import { PlaceWithUser } from '../places/place.entity';
import { Order } from '../orders/order.entity';

@Entity('lockers')
export class Locker extends PlaceWithUser {
  @Column()
  cells: number;

  @OneToMany(() => Order, (order) => order.locker)
  orders: Order[];
}
