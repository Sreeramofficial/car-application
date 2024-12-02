import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { wishItem } from '../shared/modules/wishlist';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';
import { FooterWishComponent } from './footer-wish/footer-wish.component';
import { WishFormComponent } from './wish-form/wish-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    FooterWishComponent,
    WishFormComponent,
  ], // Add CommonModule and RouterOutlet here
})
export class AppComponent {
  listFilter: String = '0';
  title = 'Sreeram';
  emptyWish: wishItem[] = [];
  get filteredWish(): wishItem[] {
    let val = this.listFilter;
    if (val == '1') {
      return this.items.filter((item) => item.isComplete);
    } else if (val == '2') {
      return this.items.filter((item) => !item.isComplete);
    } else if (val == '0') {
      return this.items;
    } else {
      return this.items;
    }
  }
  items: wishItem[] = [
    new wishItem('angular', true),
    // new wishItem('move to another company', false),
    // new wishItem('be settle', false),
  ];
  toggleItem(event: wishItem) {
    event.isComplete = !event.isComplete;
  }
  account = 'Sreeram';
  links: string[] = ['Home', 'Contact', 'Privacy&Policy'];
}
