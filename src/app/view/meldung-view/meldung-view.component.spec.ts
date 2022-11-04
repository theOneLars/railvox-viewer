import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeldungViewComponent } from './meldung-view.component';

describe('MeldungViewComponent', () => {
  let component: MeldungViewComponent;
  let fixture: ComponentFixture<MeldungViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeldungViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeldungViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
