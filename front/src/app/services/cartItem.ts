import { Producto, ProductService } from './product.service';
export interface CartItem {
    quantity: number;
    product: Producto;
}