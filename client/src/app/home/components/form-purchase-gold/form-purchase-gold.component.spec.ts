import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPurchaseGoldComponent } from './form-purchase-gold.component';

describe('FormPurchaseGoldComponent', () => {
  let component: FormPurchaseGoldComponent;
  let fixture: ComponentFixture<FormPurchaseGoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPurchaseGoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPurchaseGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
