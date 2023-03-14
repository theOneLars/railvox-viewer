import {Component, Input, OnInit} from '@angular/core';
import {TimetableData} from "../../../../business/timetable-data";
import {Verkehrsperiode} from "../../../../model/verkehrsperiode";
import * as moment from "moment";
import {Moment} from "moment";
import {OperatingPeriodTabFilterConfig} from "../../../../model/operating-period-tab-filter-config";
import {OperatingPeriodViewService} from "../../../../service/operating-period-view.service";

@Component({
  selector: 'operating-period-view',
  templateUrl: './operating-period-tab.component.html',
  styleUrls: ['./operating-period-tab.component.css']
})
export class OperatingPeriodTabComponent implements OnInit {

  @Input()
  timetableData: TimetableData;

  viewModel: OperatingPeriodTabFilterConfig = new OperatingPeriodTabFilterConfig();

  operatingPeriods: any = [];
  monthsToDisplay: Array<Moment>;

  constructor(private viewService: OperatingPeriodViewService) {
    this.viewService.getEvent().subscribe(viewModel => {
      this.viewModel = viewModel;
      this.updateMonthsToDisplay();
    });
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
    if (this.viewModel.hasData()) {
      let from = moment(this.viewModel.current.fromDate.startOf('month'));
      let to = moment(this.viewModel.current.toDate);
      this.monthsToDisplay = [];
      let numberOfMonths = Math.abs(from.diff(to, 'month', false));
      this.monthsToDisplay.push(moment(from));
      for (let i = 0; i < numberOfMonths; i++) {
        this.monthsToDisplay.push(moment(from.add(1, 'months')));
      }
    }
  }


}
