import {Passage} from "./passage";
import {Traktion} from "./traktion";
import {Verkehrsperiode} from "./verkehrsperiode";

export class Zug {

  // -1 means that there is no follow train
  static DEFAULT_NO_FOLGEZUG_ID: string = '-1';

  dk: string;
  id: string;
  vpId: string;
  zugnummer: string;
  passagen: Passage[];
  tractions: Traktion[];
  verkehrsperiode: Verkehrsperiode;
  folgezugNumber: string;
  folgezugId: string;

  constructor(dk: string, id: string, vpId: string, zugnummer: string, passagen: Passage[], tractions: Traktion[],
              verkehrsperiode: Verkehrsperiode, folgezugId: string) {
    this.dk = dk;
    this.id = id;
    this.vpId = vpId;
    this.zugnummer = zugnummer;
    this.passagen = passagen;
    this.tractions = tractions;
    this.verkehrsperiode = verkehrsperiode;
    this.folgezugId = folgezugId;
  }

  public hasTractions(): boolean {
    return this.tractions.length > 0;
  }

  public hasFolgezug(): boolean {
    return this.folgezugId.length > 0 && this.folgezugId !== Zug.DEFAULT_NO_FOLGEZUG_ID;
  }

  public getTractionsAsString(): string {
    if (this.hasTractions()) {
    }
    return this.tractions.map(tr => tr.zugNummer).join(',')
  }
}
