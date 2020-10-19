import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoprincipalComponent } from './fluxoprincipal.component';

describe('FluxoprincipalComponent', () => {
  let component: FluxoprincipalComponent;
  let fixture: ComponentFixture<FluxoprincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoprincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
