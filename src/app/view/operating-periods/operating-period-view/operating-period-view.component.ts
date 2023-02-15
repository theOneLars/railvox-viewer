import {Component, Input, OnInit} from '@angular/core';
import {TimetableData} from "../../../business/timetable-data";
import {Verkehrsperiode} from "../../../model/verkehrsperiode";
import * as moment from "moment";
import {Moment} from "moment";

@Component({
  selector: 'operating-period-view',
  templateUrl: './operating-period-view.component.html',
  styleUrls: ['./operating-period-view.component.css']
})
export class OperatingPeriodViewComponent implements OnInit {

  @Input()
  timetableData: TimetableData;
  operatingPeriods: any = [];
  selected: Verkehrsperiode;
  monthsToDisplay: Array<Moment>;

  constructor() {
  }

  ngOnInit(): void {
    this.operatingPeriods = Array.from(this.timetableData.verkehrsperiodeById.values());
    this.operatingPeriods.sort((n1: Verkehrsperiode, n2: Verkehrsperiode) => {
      let name1 = n1.displayName;
      let name2 = n2.displayName;

      if (name1 > name2) {
        return 1;
      }
      if (name1 < name2) {
        return -1;
      }
      return 0;
    });

  }

  updateMonthsToDisplay() {
    let from = moment(this.selected.fromDate.startOf('month'));
    let to = moment(this.selected.toDate);
    this.monthsToDisplay = [];
    let numberOfMonths = Math.abs(from.diff(to, 'month', false));
    this.monthsToDisplay.push(moment(from));
    for (let i = 0; i < numberOfMonths; i++) {
      this.monthsToDisplay.push(moment(from.add(1, 'months')));
    }
  }


}
