import {Zug} from "./zug";
import {Moment} from "moment";

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
      .filter(zugnummer => zugnummer === zugnummerFilter)
      .length > 0;
  }

  hasTrainValidForDay(date: Moment) {
    if (!date || !date.isValid()) {
      return false;
    }
    return this.zuege
      .map(zug => zug.verkehrsperiode)
      .filter(verkehrsperiode => verkehrsperiode.isValidOnDay(date))
      .length > 0;
  }
}
