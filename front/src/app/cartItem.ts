import { Producto, ProductService } from "./services/product.service";
export interface CartItem {
    quantity: number;
    product: Producto;
}