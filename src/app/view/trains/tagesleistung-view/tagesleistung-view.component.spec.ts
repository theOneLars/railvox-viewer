import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagesleistungViewComponent } from './tagesleistung-view.component';

describe('TagesleistungComponent', () => {
  let component: TagesleistungViewComponent;
  let fixture: ComponentFixture<TagesleistungViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagesleistungViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagesleistungViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
