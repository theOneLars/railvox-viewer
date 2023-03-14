import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingPeriodTabComponent } from './operating-period-tab.component';

describe('OperatingPeriodViewComponent', () => {
  let component: OperatingPeriodTabComponent;
  let fixture: ComponentFixture<OperatingPeriodTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingPeriodTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatingPeriodTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
