import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsTabComponent } from './trains-tab.component';

describe('TrainsOverviewComponent', () => {
  let component: TrainsTabComponent;
  let fixture: ComponentFixture<TrainsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
