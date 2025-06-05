import { Component, OnInit } from '@angular/core';
import { ProductService, Producto } from '../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: FormGroup;
  productoAEliminar: Producto | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      },
    });
  }

  cantidadProductos(): number {
    return this.productos.length;
  }

  agregarProducto() {
    const nuevoProducto: Producto = {
      producto: this.productoForm.get('producto')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      precio: this.productoForm.get('precio')?.value,
      imageUrl: this.productoForm.get('imageUrl')?.value,
    };

    this.productService.agregarProducto(nuevoProducto).subscribe({
      next: (producto) => {
        this.productos.push(producto);
        this.productoForm.reset();
        this.productos = [...this.productos, producto];
      },
      error: (err) => {
        console.error('Error agregando producto:', err);
      },
    });
  }

  confirmarEliminarProducto(producto: Producto): void {
    this.productoAEliminar = { ...producto };
  }

  eliminarProducto(): void {
    if (this.productoAEliminar && this.productoAEliminar.id) {
      this.productService
        .eliminarProducto(this.productoAEliminar.id, this.productoAEliminar)
        .subscribe({
          next: () => {
            this.productos = this.productos.filter(
              (p) => p.id !== this.productoAEliminar!.id
            );
            this.productoAEliminar = null;
          },
          error: (err) => {
            console.error('Error eliminando producto:', err);
          },
        });
    }
  }

  cancelarEliminacion(): void {
    this.productoAEliminar = null;
  }
}
