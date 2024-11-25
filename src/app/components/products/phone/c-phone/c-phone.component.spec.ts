import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPhoneComponent } from './c-phone.component';

describe('CPhoneComponent', () => {
  let component: CPhoneComponent;
  let fixture: ComponentFixture<CPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
