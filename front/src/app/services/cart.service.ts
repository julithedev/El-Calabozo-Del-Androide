import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.updateCart();
    }
  }

  getItems(): CartItem[] {
    return [...this.cartItems];
  }

  addItem(product: any): void {
    const existing = this.cartItems.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCart();
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.cartItems.find(i => i.product.id === id);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(i => i.product.id !== id);
    this.updateCart();
  }

  private updateCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
    const total = this.cartItems.reduce((sum, i) => sum + i.quantity * i.product.precio, 0);
    this.totalSubject.next(total);
  }
}
