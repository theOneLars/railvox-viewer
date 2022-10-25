import {Passage} from "./passage";

export class Zug {

  dk: string;
  id: string;
  vpId: string;
  zugnummer: string;
  passagen: Passage[];

  constructor(dk: string, id: string, vpId: string, zugnummer: string, passagen: Passage[]) {
    this.dk = dk;
    this.id = id;
    this.vpId = vpId;
    this.zugnummer = zugnummer;
    this.passagen = passagen;
  }
}
