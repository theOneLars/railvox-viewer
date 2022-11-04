import {MeldungVariante} from "./meldung-variante";
import {Sprache} from "./sprache";

export class Meldung {

  meldungVarianten: MeldungVariante[];
  name: string;
  outputMediumCode: string;
  outputMediumId: string;
  sprache: Sprache;

  constructor(meldungVarianten: MeldungVariante[], name: string, outputMediumCode: string, outputMediumId: string, sprache: Sprache) {
    this.meldungVarianten = meldungVarianten;
    this.name = name;
    this.outputMediumCode = outputMediumCode;
    this.outputMediumId = outputMediumId;
    this.sprache = sprache;
  }
}
