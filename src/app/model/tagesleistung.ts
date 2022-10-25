import {Zug} from "./zug";

export class Tagesleistung {

  nummer: string;
  zuege: Zug[];

  constructor(zuege: Zug[], nummer: string) {
    this.zuege = zuege;
    this.nummer = nummer;
  }

}
