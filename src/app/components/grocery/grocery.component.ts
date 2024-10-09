import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AddToBucket, removeFromBucket } from '../../store/actions/bucket.action';
import { selectGroceries } from '../../store/selectors/grocery.selector';

@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {

  groceries$?:Observable<Grocery[]>;

  constructor(private store: Store<{groceries:Grocery[]}>){
    this.groceries$ = store.select(selectGroceries)
  }

  onTypeChange(event: Event){

  }

  increment(item:Grocery){
    const payload = {
      id:item.id,
      name:item.name,
      quantity:1
    }
    this.store.dispatch(AddToBucket({payload}))
  }

  decrement(item:Grocery){
    const payload = {
      id:item.id
    }
    
    this.store.dispatch(removeFromBucket({payload}))
  }

}
