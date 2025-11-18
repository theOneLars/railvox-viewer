import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingPeriodTabComponent } from './operating-period-tab.component';
import {TimetableData} from 'src/app/business/timetable-data';

describe('OperatingPeriodTabComponent', () => {
  let component: OperatingPeriodTabComponent;
  let fixture: ComponentFixture<OperatingPeriodTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingPeriodTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatingPeriodTabComponent);
    component = fixture.componentInstance;
    component.timetableData = new TimetableData()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
