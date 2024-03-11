import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Product } from '@shared/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styles: [],
  animations: [
    trigger('stagger',[
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class HomeComponent {
  cartStore = inject(CartStore);
  private readonly productService = inject(ProductsService).getProducts();
  public title = signal<String>("Listado de productos");

  public addToCart = (product: Product) => {
    this.cartStore.addToCart(product);
  }

}
