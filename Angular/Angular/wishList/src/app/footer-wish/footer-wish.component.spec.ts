import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWishComponent } from './footer-wish.component';

describe('FooterWishComponent', () => {
  let component: FooterWishComponent;
  let fixture: ComponentFixture<FooterWishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterWishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
