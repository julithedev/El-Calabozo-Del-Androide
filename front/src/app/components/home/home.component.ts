import { Component, OnInit } from '@angular/core';
import { ProductService, Producto } from '../../services/product.service';
import { CartItem } from '../../cartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [
    { id: 1, producto: 'Mouse gamer', descripcion: 'Mouse con RGB', precio: 100 },
    { id: 2, producto: 'Teclado mecánico', descripcion: 'Switches azules', precio: 200 },
    { id: 3, producto: 'Monitor 144Hz', descripcion: '27 pulgadas', precio: 300 }
  ];
  items: CartItem[] = [];
  total: number = 0;
  showcar: boolean = false;

  constructor(
    private productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.obtenerProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  onAddItem(product: Producto): void {
    this.cartService.addItem(product);
  }
}
