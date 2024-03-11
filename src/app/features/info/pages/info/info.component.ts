import { JsonPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
export class InfoComponent {
  public title = signal<String>('Lista de deseos');
  public wish = new FormControl();
  public wishes = signal<Wish[]>([])

  constructor() {
    effect(() => {
      console.log('Effect!', this.wishes());
    });
  }

  addWish = () => {
    console.log(this.wish.value)
    this.wish.value && this.wish.value.length > 3 && this.wishes.update((wishes) => [
      ...wishes,
      {name: this.wish.value, isCompleted: false, id: this.wishes.length }
    ])
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
