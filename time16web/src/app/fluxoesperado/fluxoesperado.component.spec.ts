import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoesperadoComponent } from './fluxoesperado.component';

describe('FluxoesperadoComponent', () => {
  let component: FluxoesperadoComponent;
  let fixture: ComponentFixture<FluxoesperadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoesperadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoesperadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
