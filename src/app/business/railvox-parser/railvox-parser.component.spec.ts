import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RailvoxParserComponent} from './railvox-parser.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Betriebspunkt} from "../../model/betriebspunkt";
import {Tagesleistung} from "../../model/tagesleistung";
import {Zug} from "../../model/zug";
import {StreckenAbschnitt} from "../../model/strecken-abschnitt";
import {MatCardModule} from "@angular/material/card";
import {MeldungVariante, VariantenType} from "../../model/meldung-variante";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {Sprache} from "../../model/sprache";

describe('RailvoxParserComponent', () => {
  let component: RailvoxParserComponent;
  let fixture: ComponentFixture<RailvoxParserComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatCardModule, MatProgressSpinnerModule],
      providers: [HttpClient],
      declarations: [RailvoxParserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RailvoxParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
