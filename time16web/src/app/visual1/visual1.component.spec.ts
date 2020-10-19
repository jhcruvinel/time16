import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Visual1Component } from './visual1.component';

describe('Visual1Component', () => {
  let component: Visual1Component;
  let fixture: ComponentFixture<Visual1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Visual1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Visual1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
