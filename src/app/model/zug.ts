import {Passage} from "./passage";
import {Traktion} from "./traktion";
import {Verkehrsperiode} from "./verkehrsperiode";

export class Zug {

  dk: string;
  id: string;
  vpId: string;
  zugnummer: string;
  passagen: Passage[];
  tractions: Traktion[];
  verkehrsperiode: Verkehrsperiode;

  constructor(dk: string, id: string, vpId: string, zugnummer: string, passagen: Passage[], tractions: Traktion[], verkehrsperiode: Verkehrsperiode) {
    this.dk = dk;
    this.id = id;
    this.vpId = vpId;
    this.zugnummer = zugnummer;
    this.passagen = passagen;
    this.tractions = tractions;
    this.verkehrsperiode = verkehrsperiode;
  }

  public hasTractions(): boolean {
    return this.tractions.length > 0;
  }

  public getTractionsAsString(): string {
    if (this.hasTractions()) {
    }
    return this.tractions.map(tr => tr.zugNummer).join(',')
  }
}
