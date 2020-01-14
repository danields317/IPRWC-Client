import {Injectable, OnDestroy} from '@angular/core';
import {OrderItem} from '../models/orderItem';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsList: OrderItem[] = [];
  public cartItems = new BehaviorSubject(null);

    constructor() {
    }

    addItem(productId, amount) {
      const item: OrderItem = {productId, amount};
      this.cartItemsList.push(item);
      this.cartItems.next(this.cartItemsList);
      this.writeToStorage();
    }

    removeItem(productId) {
      this.cartItemsList.splice(this.findIndex(productId), 1);
      this.cartItems.next(this.cartItemsList);
      this.writeToStorage();
    }

    isItemInCart(productId) {
      if (this.findIndex(productId) === null) {
        return false;
      } else {
        return true;
      }
    }

    clearCart() {
      this.cartItemsList = [];
      this.clearStorage();
      this.cartItems.next(this.cartItemsList);
    }

    private findIndex(productId) {
      for (const item of this.cartItemsList) {
        if (+item.productId === +productId) {
          return this.cartItemsList.indexOf(item);
        }
      }
      return null;
    }

    private writeToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cartItemsList));
    }

    getItemsFromStorage() {
      const result =  JSON.parse(localStorage.getItem('cart'));
      if (result === null) {
        this.cartItemsList = [];
      } else {
        this.cartItemsList = result;
      }
      console.log(this.cartItemsList);
      this.cartItems.next(this.cartItemsList);
    }

    private clearStorage() {
      localStorage.removeItem('cart');
    }
}
