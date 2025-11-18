import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainVariantTabComponent } from './train-variant-tab.component';
import {TimetableData} from 'src/app/business/timetable-data';
import {MatSelectModule} from '@angular/material/select';

describe('TrainVariantTabComponent', () => {
  let component: TrainVariantTabComponent;
  let fixture: ComponentFixture<TrainVariantTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainVariantTabComponent ],
      providers: [MatSelectModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainVariantTabComponent);
    component = fixture.componentInstance;
    component.timetableData = new TimetableData()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
