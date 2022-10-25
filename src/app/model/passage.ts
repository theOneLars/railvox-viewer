import {Betriebspunkt} from "./betriebspunkt";
import {Zug} from "./zug";
import {Trigger} from "./trigger";

export class Passage {

  betriebspunke: Betriebspunkt;
  trigger: Trigger[];
  traktionen: Zug[];

  constructor(betriebspunke: Betriebspunkt, trigger: Trigger[], traktionen: Zug[]) {
    this.betriebspunke = betriebspunke;
    this.trigger = trigger;
    this.traktionen = traktionen;
  }
}
