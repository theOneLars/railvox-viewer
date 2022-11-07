import {Zug} from "./zug";

export class Tagesleistung {

  nummer: string;
  zuege: Zug[];

  constructor(zuege: Zug[], nummer: string) {
    this.zuege = zuege;
    this.nummer = nummer;
  }

  hasTrainWithNumber(zugnummerFilter: string) {
    if (!zugnummerFilter) {
      return false;
    }
    return this.zuege
      .map(zug => zug.zugnummer)
      .filter(zugnummer => zugnummer.includes(zugnummerFilter))
      .length > 0;
  }

  hasTrainValidForDay(date: Date) {
    if (!date) {
      return false;
    }
    return this.zuege
      .map(zug => zug.verkehrsperiode)
      .filter(verkehrsperiode => verkehrsperiode.isValidOnDay(date))
      .length > 0;
  }
}
