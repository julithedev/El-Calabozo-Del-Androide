import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Producto {
  id?: number;
  producto: string;
  descripcion: string;
  precio: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http
      .get<{ message: string; productos: Producto[] }>(this.apiUrl)
      .pipe(map((response) => response.productos));
  }

  agregarProducto(producto: Producto) {
    return this.http
      .post<Producto>(`${this.apiUrl}`, producto, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap((nuevoProducto) => {
          console.log('Producto agregado:', nuevoProducto);
        })
      );
  }

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: number, producto: Producto): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { body: producto });
  }
}
