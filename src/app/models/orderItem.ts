import {Product} from './product';

export interface OrderItem {

  product?: Product;
  productId: string;
  amount: number;
}
