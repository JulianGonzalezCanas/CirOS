import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './profile.component';  // Asegúrate de que la ruta y el nombre del archivo sean correctos
import { ReactiveFormsModule } from '@angular/forms';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent, ReactiveFormsModule]  // Asegúrate de que el componente se importe correctamente
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
