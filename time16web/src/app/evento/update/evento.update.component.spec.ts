import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Evento.UpdateComponent } from './evento.update.component';

describe('Evento.UpdateComponent', () => {
  let component: Evento.UpdateComponent;
  let fixture: ComponentFixture<Evento.UpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Evento.UpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Evento.UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
