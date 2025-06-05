import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CartItem } from '../../cartItem';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  subtotal = 0;
  shipping = 0;
  taxes = 0;
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.items = items;
      this.calculateSummary();
    });

    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
  }

  onDeleteCart(id: number): void {
    this.cartService.removeItem(id);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.product.id!, item.quantity);
    }
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < 10) {
      item.quantity++;
      this.cartService.updateQuantity(item.product.id!, item.quantity);
    }
  }

  onQuantityChange(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id!, item.quantity);
  }

  calculateSummary(): void {
    this.subtotal = this.items.reduce((sum, item) => sum + item.quantity * item.product.precio, 0);
    this.shipping = this.subtotal > 0 ? 10 : 0;
    this.taxes = this.subtotal * 0.21;
    this.total = this.subtotal + this.shipping + this.taxes;
  }

  checkout(): void {
    alert('Procediendo al pago...');
  }
}