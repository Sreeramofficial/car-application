import { Component, Input } from '@angular/core';

@Component({
  selector: 'footer-wish',
  standalone: true,
  imports: [],
  templateUrl: './footer-wish.component.html',
  styleUrl: './footer-wish.component.css',
})
export class FooterWishComponent {
  @Input() links: string[] = ['home'];
}
