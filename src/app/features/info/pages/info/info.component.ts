import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartStore } from '@shared/store/shopping-cart.store';
import { ToastrService } from 'ngx-toastr';

interface Wish {
  id: number;
  name: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './info.component.html',
  styles: ``
})
export class InfoComponent implements OnDestroy {
  cartStore = inject(CartStore);
  toastSvc = inject(ToastrService)
  public title = signal<String>('Lista de deseos');
  public wish = new FormControl();
  public wishes = signal<Wish[]>([])

  constructor() {
    this.wishes.set(this.cartStore.wishes())
    effect(() => {
      console.log('Effect!', this.wishes());
    }, { allowSignalWrites: true });
  }
  ngOnDestroy(): void {
    console.log('Effect!', this.wishes());
    this.cartStore.updateWishes(this.wishes());
  }

  addWish = () => {
    if(this.wish.value && this.wish.value.length > 3 &&
    !this.wishes().some((wish)=> wish.name.toLowerCase() === this.wish.value.toLowerCase())) {
      this.wishes.update((wishes) => [
        ...wishes,
        {name: this.wish.value, isCompleted: false, id: this.wishes().length }
      ]);
        this.toastSvc.success('Wish added');
    }
    return false;
  }
  public resetWishes = () => {
    this.wishes.set([]);
    return false;
  }

  public markAsComplete = (wish: Wish) => {
    this.wishes.update((wishes: Wish[]) => {
      const wishToUpdate = this.wishes().find((w) => w.name === wish.name);
      if (wishToUpdate) wishToUpdate.isCompleted = true;
      return wishes;
    })
    return false;
  }
}
