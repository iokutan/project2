import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchRepairComponent } from './watch-repair.component';

describe('WatchRepairComponent', () => {
  let component: WatchRepairComponent;
  let fixture: ComponentFixture<WatchRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
