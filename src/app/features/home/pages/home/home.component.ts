import { Component, inject, computed, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styles: [
    `
      div {
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
      }

      .container {
        flex-basis: 250px;
        height: 300px;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class HomeComponent {
  cartStore = inject(CartStore);
  private readonly productService = inject(ProductsService).getProducts();
  public products = signal<Product[]>(this.cartStore.productsAll());

}
