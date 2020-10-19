import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Visual3Component } from './visual3.component';

describe('Visual3Component', () => {
  let component: Visual3Component;
  let fixture: ComponentFixture<Visual3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Visual3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Visual3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
