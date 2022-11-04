import {Sprache} from "./sprache";

export class MeldungVariante {

  type: VariantenType;
  format: string;
  filename: string;
  text: string;
  sprache: Sprache;

  constructor(type: VariantenType, format: string, filename: string, text: string, sprache?: Sprache) {
    this.type = type;
    this.format = format;
    this.filename = filename;
    this.text = text;
    if (sprache) {
      this.sprache = sprache;
    }
  }
}

export enum VariantenType {
  AudioMeldung = 1,
  BildMeldung= 2,
  TextMeldung = 3
}
