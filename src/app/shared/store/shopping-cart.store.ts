import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

interface Wish {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface CartStore {
  products: Product[];
  wishes: Wish[];
  productsAll: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  wishes: [],
  productsAll: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, wishes, ...store }, toastSvc = inject(ToastrService)) => ({
    addToCart(product: Product) {
      patchState(store, { products: [...products(), product] });
      toastSvc.success('Product added', 'DUALBOOT STORE');
    },
    updateWishes(lastwishes: Wish[]) {
      patchState(store, { wishes: lastwishes });
    },
    removeFromCart(id: number) {
      const updatedProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: updatedProducts });
      toastSvc.info('Product removed', 'DUALBOOT STORE');
    },
    clearCart() {
      patchState(store, initialState);
      toastSvc.info('Cart cleared', 'DUALBOOT STORE');
    },
    addProducts(products: Product[]) {
      patchState(store, { productsAll: products });
    },
  }))
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.price, 0);
}

function calculateProductCount(products: Product[]): number {
  return products.length;
}
