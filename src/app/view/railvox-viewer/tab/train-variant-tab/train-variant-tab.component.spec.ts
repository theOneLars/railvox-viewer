import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainVariantTabComponent } from './train-variant-tab.component';

describe('TrainVariantTabComponent', () => {
  let component: TrainVariantTabComponent;
  let fixture: ComponentFixture<TrainVariantTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainVariantTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainVariantTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
