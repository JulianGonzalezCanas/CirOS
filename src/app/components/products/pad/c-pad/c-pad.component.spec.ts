import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPadComponent } from './c-pad.component';

describe('CPadComponent', () => {
  let component: CPadComponent;
  let fixture: ComponentFixture<CPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
