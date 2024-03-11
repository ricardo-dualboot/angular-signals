import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Product } from '@shared/models/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``
})
export class CartComponent {
  cartStore = inject(CartStore);
  public products = signal<Product[]>(this.cartStore.products());

}
