import {OrderItem} from './orderItem';

export interface Order {
  id: number;
  accountId: number;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryNumber: string;
  deliveryDate: string;
  items: OrderItem[];
}
