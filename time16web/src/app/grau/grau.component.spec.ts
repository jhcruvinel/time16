import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrauComponent } from './grau.component';

describe('GrauComponent', () => {
  let component: GrauComponent;
  let fixture: ComponentFixture<GrauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
