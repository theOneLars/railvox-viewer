import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Verkehrsperiode} from "../../../../../model/verkehrsperiode";
import {Moment} from "moment";
import {DateRange, MatCalendarCellCssClasses} from "@angular/material/datepicker";
import * as moment from "moment";

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarViewComponent implements OnInit {

  @Input()
  operatingPeriod: Verkehrsperiode;

  @Input()
  month: Moment;

  monthToDisplay: DateRange<Moment>;

  constructor() {
  }

  ngOnInit(): void {
    let from = moment(this.month.startOf('month'));
    let to = moment(this.month.endOf('month'));
    this.monthToDisplay = new DateRange(from, to);
  }

  public dateClass() {
    return (date: Moment): MatCalendarCellCssClasses => {
      return this.operatingPeriod.isValidOnDay(date) ? 'day-valid' : 'day-not-valid';
    }
  }

}
