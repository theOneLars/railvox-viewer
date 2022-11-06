import {Betriebspunkt} from "./betriebspunkt";
import {Zug} from "./zug";
import {Trigger} from "./trigger";
import {StreckenAbschnitt} from "./strecken-abschnitt";

export class Passage {

  betriebspunk: Betriebspunkt;
  trigger: Trigger[];
  ankunft: string;
  abfahrt: string;
  streckenabschnitt: StreckenAbschnitt;

  constructor(betriebspunk: Betriebspunkt, trigger: Trigger[], ankunft: string, abfahrt: string,
              streckenabschnitt: StreckenAbschnitt) {
    this.betriebspunk = betriebspunk;
    this.trigger = trigger;
    this.ankunft = ankunft;
    this.abfahrt = abfahrt;
    this.streckenabschnitt = streckenabschnitt;
  }
}
