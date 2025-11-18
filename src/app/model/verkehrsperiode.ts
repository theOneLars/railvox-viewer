import {Moment} from "moment";
import {DateFormatter} from 'src/app/util/date-formatter';

const moment = require('moment');

export class Verkehrsperiode {

  id: string;
  name: string;
  private _fromDate: Moment;
  private _toDate: Moment;
  bitMaske: string;
  displayName: string;

  constructor(id: string, name: string, fromDate: string, toDate: string, bitMaske: string) {
    this.id = id;
    this.name = name;
    this._fromDate = DateFormatter.convertToDate(fromDate);
    this._toDate = DateFormatter.convertToDate(toDate);
    this.bitMaske = bitMaske;
    this.displayName = name + ' (' + id + ')';
  }

  public getNumberOfDays() {
    return this._toDate.diff(this._fromDate, 'days');
  }

  public isValidOnDay(input: Moment): boolean {
    let dateToCheck = moment(input);
    let fromDate = moment(this._fromDate);
    let toDate = moment(this._toDate);

    if (dateToCheck > toDate || dateToCheck < fromDate) {
      return false;
    }

    let daysFromStart = dateToCheck.diff(fromDate, 'days');
    let bitmask = this.getBinaryBitmask();
    let day = bitmask.substring(daysFromStart, daysFromStart + 1);

    return day === '1';
  }

  public getBinaryBitmask(): string {
    let numberOfDays = this.getNumberOfDays() + 1;
    let result = '';
    let i = 0;

    let subBits = this.bitMaske;

    while (subBits.length > 0) {
      let daysLeft = numberOfDays - result.length;
      if (daysLeft < 4) {
        result += (this.fromHexString(subBits.substring(0, 1), daysLeft));
      } else {
        result += (this.fromHexString(subBits.substring(0, 1), 4));
      }
      i++;
      subBits = this.bitMaske.substring(i);
    }

    return result;
  }

  public getFirstValidDay(): Moment {
    let position = this.getBinaryBitmask().indexOf('1');
    if (position == -1) {
      return this.fromDate;
    }
    return this.fromDate.add(position, 'days');
  }

  public getNumberOfActiveDays(): number {
    return this.getBinaryBitmask().split('1').length - 1;
  }

  private fromHexString(s: string, days: number): string {
    let asInt = Number.parseInt(s, 16);
    let result = asInt.toString(2);

    while (result.length < days) {
      result = "0" + result;
    }

    return result;
  }


  get fromDate(): moment.Moment {
    return moment(this._fromDate);
  }

  get toDate(): moment.Moment {
    return moment(this._toDate);
  }
}
