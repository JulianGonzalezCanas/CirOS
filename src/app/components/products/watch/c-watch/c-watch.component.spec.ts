import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CWatchComponent } from './c-watch.component';

describe('CWatchComponent', () => {
  let component: CWatchComponent;
  let fixture: ComponentFixture<CWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CWatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
