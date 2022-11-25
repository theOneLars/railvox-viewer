import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingPeriodViewComponent } from './operating-period-view.component';

describe('OperatingPeriodViewComponent', () => {
  let component: OperatingPeriodViewComponent;
  let fixture: ComponentFixture<OperatingPeriodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingPeriodViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatingPeriodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
