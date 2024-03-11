import { Injectable, inject } from '@angular/core';
import type { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { CartStore } from '@shared/store/shopping-cart.store';

const PRODUCTS_URL = 'https://fakestoreapi.com/products/?sort=desc';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartStore = inject(CartStore);
  private readonly httpClient = inject(HttpClient);

  public getProducts(): void {
    this.httpClient.get<Product[]>(PRODUCTS_URL)
    .pipe(
      tap((products: any) => {
        this.cartStore.addProducts(products);
      }),
      catchError((err) => {
        console.error(err);
        return of(undefined)
      })
    )
    .subscribe();
  }

  public getProduct(id: number): Observable<Product[] | undefined> {
    return this.httpClient.get<Product[]>(`${PRODUCTS_URL}/${id}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return of(undefined)
        })
      );
  }
}
