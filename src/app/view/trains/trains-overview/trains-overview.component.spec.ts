import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsOverviewComponent } from './trains-overview.component';

describe('TrainsOverviewComponent', () => {
  let component: TrainsOverviewComponent;
  let fixture: ComponentFixture<TrainsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
