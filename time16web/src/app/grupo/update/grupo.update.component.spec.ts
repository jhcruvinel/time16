import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoUpdateComponent } from './grupo.update.component';

describe('UpdateComponent', () => {
  let component: GrupoUpdateComponent;
  let fixture: ComponentFixture<GrupoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
