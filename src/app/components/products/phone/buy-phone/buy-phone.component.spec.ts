import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPhoneComponent } from './buy-phone.component';

describe('BuyPhoneComponent', () => {
  let component: BuyPhoneComponent;
  let fixture: ComponentFixture<BuyPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
