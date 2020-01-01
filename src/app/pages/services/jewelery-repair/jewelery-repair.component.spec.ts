import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeweleryRepairComponent } from './jewelery-repair.component';

describe('JeweleryRepairComponent', () => {
  let component: JeweleryRepairComponent;
  let fixture: ComponentFixture<JeweleryRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeweleryRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeweleryRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
