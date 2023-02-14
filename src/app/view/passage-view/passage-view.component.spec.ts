import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageViewComponent } from './passage-view.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Passage} from "../../model/passage";
import {Betriebspunkt} from "../../model/betriebspunkt";
import {StreckenAbschnitt} from "../../model/strecken-abschnitt";

describe('PassageViewComponent', () => {
  let component: PassageViewComponent;
  let fixture: ComponentFixture<PassageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [ PassageViewComponent ],
      providers: [MatSnackBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassageViewComponent);
    component = fixture.componentInstance;
    component.passage = new Passage(new Betriebspunkt('Chur', 'CH'), [], '10:10', '10:15', new StreckenAbschnitt('100'))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
