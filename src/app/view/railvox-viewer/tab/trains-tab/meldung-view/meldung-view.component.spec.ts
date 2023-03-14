import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeldungViewComponent} from './meldung-view.component';
import {Meldung} from "../../model/meldung";
import {MeldungVariante, VariantenType} from "../../model/meldung-variante";
import {SprachProvider} from "../../business/test-provider/sprach-provider";

describe('MeldungViewComponent', () => {
  let component: MeldungViewComponent;
  let fixture: ComponentFixture<MeldungViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeldungViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeldungViewComponent);
    component = fixture.componentInstance;
    let meldungVariante = new MeldungVariante(VariantenType.AudioMeldung, 'audio/mpeg3', 'G_MGGONG-1.mp3', '', SprachProvider.german());
    component.meldung = new Meldung([meldungVariante], 'Landquart', 'screen.Text.Linie', '62');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
