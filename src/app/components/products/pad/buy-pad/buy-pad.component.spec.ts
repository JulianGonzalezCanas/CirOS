import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPadComponent } from './buy-pad.component';

describe('BuyPadComponent', () => {
  let component: BuyPadComponent;
  let fixture: ComponentFixture<BuyPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
