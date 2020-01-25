import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDemandComponent } from './form-demand.component';

describe('FormDemandComponent', () => {
  let component: FormDemandComponent;
  let fixture: ComponentFixture<FormDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
