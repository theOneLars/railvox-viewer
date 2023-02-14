import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerViewComponent } from './trigger-view.component';
import {Trigger} from "../../model/trigger";

describe('TriggerViewComponent', () => {
  let component: TriggerViewComponent;
  let fixture: ComponentFixture<TriggerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerViewComponent);
    component = fixture.componentInstance;
    component.trigger = new Trigger('init', '', '', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
