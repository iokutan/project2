import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPurchaseWatchComponent } from './form-purchase-watch.component';

describe('FormPurchaseWatchComponent', () => {
  let component: FormPurchaseWatchComponent;
  let fixture: ComponentFixture<FormPurchaseWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPurchaseWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPurchaseWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
