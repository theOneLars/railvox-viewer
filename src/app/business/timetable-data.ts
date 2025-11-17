import {Betriebspunkt} from "../model/betriebspunkt";
import {StreckenAbschnitt} from "../model/strecken-abschnitt";
import {MeldungVariante} from "../model/meldung-variante";
import {Sprache} from "../model/sprache";
import {Meldung} from "../model/meldung";
import {Tagesleistung} from "../model/tagesleistung";
import {Verkehrsperiode} from "../model/verkehrsperiode";
import {Stammdaten} from 'src/app/model/stammdaten';
import {Fahrplan} from 'src/app/model/fahrplan';

export class TimetableData {

  title: string;
  stammdaten: Stammdaten;
  fahrplan: Fahrplan;
  betriebspunkById = new Map<string, Betriebspunkt>();
  verkehrsperiodeById = new Map<string, Verkehrsperiode>();
  streckenabschnitteById = new Map<string, StreckenAbschnitt>();
  meldungVarianteById = new Map<string, MeldungVariante>();
  spracheById = new Map<string, Sprache>();
  meldungenById = new Map<string, Meldung>();
  tagesLeistungen: Tagesleistung[] = [];
}
