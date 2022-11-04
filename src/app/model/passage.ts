import {Betriebspunkt} from "./betriebspunkt";
import {Zug} from "./zug";
import {Trigger} from "./trigger";

export class Passage {

  betriebspunke: Betriebspunkt;
  trigger: Trigger[];
  traktionen: Zug[];
  ankunft: string;
  abfahrt: string;

  constructor(betriebspunke: Betriebspunkt, trigger: Trigger[], traktionen: Zug[], ankunft: string, abfahrt: string) {
    this.betriebspunke = betriebspunke;
    this.trigger = trigger;
    this.traktionen = traktionen;
    this.ankunft = ankunft;
    this.abfahrt = abfahrt;
  }
}
