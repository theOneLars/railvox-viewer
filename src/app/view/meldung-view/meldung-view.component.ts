import {Component, Input, OnInit} from '@angular/core';
import {Meldung} from "../../model/meldung";
import {MeldungVariante, VariantenType} from "../../model/meldung-variante";

@Component({
  selector: 'meldung-view',
  templateUrl: './meldung-view.component.html',
  styleUrls: ['./meldung-view.component.css']
})
export class MeldungViewComponent implements OnInit {

  @Input()
  meldung: Meldung;

  constructor() {

  }

  ngOnInit(): void {
  }

  isTextMeldungVariante(variante: MeldungVariante) {
    return typeof variante !== 'undefined' && variante.type === VariantenType.TextMeldung;
  }

  isBildMeldungVariante(variante: MeldungVariante) {
    return typeof variante !== 'undefined' && variante.type === VariantenType.BildMeldung;
  }

  isAudioMeldungVariante(variante: MeldungVariante) {
    return typeof variante !== 'undefined' && variante.type === VariantenType.AudioMeldung;
  }
}
