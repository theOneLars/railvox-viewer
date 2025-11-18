import {Moment} from "moment";

const moment = require('moment');

export class DateFormatter {

  public static convertToDate(date: string): Moment {
    let year = Number(date.substring(0, 4));
    let month = Number(date.substring(5, 7));
    let day = Number(date.substring(8, 10));
    return moment([year, month -1, day]);
  }

}
