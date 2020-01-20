import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleUhrenComponent } from './sale-uhren.component';

describe('SaleUhrenComponent', () => {
  let component: SaleUhrenComponent;
  let fixture: ComponentFixture<SaleUhrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleUhrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleUhrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
