import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageViewComponent } from './passage-view.component';

describe('PassageViewComponent', () => {
  let component: PassageViewComponent;
  let fixture: ComponentFixture<PassageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
