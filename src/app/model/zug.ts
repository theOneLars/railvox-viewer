import {Passage} from "./passage";
import {Traktion} from "./traktion";

export class Zug {

  dk: string;
  id: string;
  vpId: string;
  zugnummer: string;
  passagen: Passage[];
  tractions: Traktion[];

  constructor(dk: string, id: string, vpId: string, zugnummer: string, passagen: Passage[], tractions: Traktion[]) {
    this.dk = dk;
    this.id = id;
    this.vpId = vpId;
    this.zugnummer = zugnummer;
    this.passagen = passagen;
    this.tractions = tractions;
  }

  public hasTractions(): boolean {
    return this.tractions.length > 0;
  }

  public getTractionsAsString(): string {
    if (this.hasTractions()) {
      console.log('tractions', this.tractions);
    }
    return this.tractions.map(tr => tr.zugNummer).join(',')
  }
}
