import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZugViewComponent } from './zug-view.component';

describe('ZugViewComponent', () => {
  let component: ZugViewComponent;
  let fixture: ComponentFixture<ZugViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZugViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZugViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
