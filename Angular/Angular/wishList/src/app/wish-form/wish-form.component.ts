import { Component, Output, EventEmitter, Input } from '@angular/core';
import { wishItem } from '../../shared/modules/wishlist';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'wish-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wish-form.component.html',
  styleUrl: './wish-form.component.css',
})
export class WishFormComponent {
  @Output() addNewWish = new EventEmitter<wishItem>();

  newTarget = '';
  newTargetStatus: boolean = false;
  addWish() {
    // this.items.push(new wishItem(this.newTarget, this.newTargetStatus));
    this.addNewWish.emit(new wishItem(this.newTarget, this.newTargetStatus));

    this.newTarget = '';
    this.newTargetStatus = false;
  }
}
