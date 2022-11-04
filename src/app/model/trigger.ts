import {Meldung} from "./meldung";

export class Trigger {

  typ: string;
  name: string;
  value: string;
  meldungen: Meldung[];

  constructor(typ: string, name: string, value: string, meldungen: Meldung[]) {
    this.typ = typ;
    this.name = name;
    this.value = value;
    this.meldungen = meldungen;
  }
}
