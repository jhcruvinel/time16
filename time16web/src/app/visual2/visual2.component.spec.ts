import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Visual2Component } from './visual2.component';

describe('Visual2Component', () => {
  let component: Visual2Component;
  let fixture: ComponentFixture<Visual2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Visual2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Visual2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
