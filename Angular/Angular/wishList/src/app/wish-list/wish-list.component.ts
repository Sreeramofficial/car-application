import { Component, Input } from '@angular/core';
import { wishItem } from '../../shared/modules/wishlist';
import { AppComponent } from '../app.component';

@Component({
  selector: 'wish-list',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  newTarget: string = '';
  newTargetStatus: boolean = false;
  listFilter = '0';
  emptyWish: wishItem[] = [];

  items: wishItem[] = [
    new wishItem('angular', true),
    // new wishItem('move to another company', false),
    // new wishItem('be settle', false),
  ];
  addWish() {
    this.items.push(new wishItem(this.newTarget, this.newTargetStatus));
    this.newTarget = '';
    this.newTargetStatus = false;
  }

  toggleItem(event: wishItem) {
    event.isComplete = !event.isComplete;
  }

  @Input items: wishItem[] = [];
}
