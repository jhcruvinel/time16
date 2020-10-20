import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosituacaoComponent } from './processosituacao.component';

describe('ProcessosituacaoComponent', () => {
  let component: ProcessosituacaoComponent;
  let fixture: ComponentFixture<ProcessosituacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessosituacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosituacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
