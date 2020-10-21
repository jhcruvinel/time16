import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Evento.CreateComponent } from './evento.create.component';

describe('Evento.CreateComponent', () => {
  let component: Evento.CreateComponent;
  let fixture: ComponentFixture<Evento.CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Evento.CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Evento.CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
