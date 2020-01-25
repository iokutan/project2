import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktuelComponent } from './aktuel.component';

describe('AktuelComponent', () => {
  let component: AktuelComponent;
  let fixture: ComponentFixture<AktuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
