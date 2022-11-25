import {Component, Input, OnInit} from '@angular/core';
import {TimetableData} from "../../../business/timetable-data";
import {Verkehrsperiode} from "../../../model/verkehrsperiode";

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

  // now = moment.now();
  // tomorrow = moment(moment.now()).add(1, 'days')
  //
  // selected = [this.now, this.tomorrow];

  constructor() {
  }

  ngOnInit(): void {
    this.timetableData.verkehrsperiodeById.forEach((operatingPeriod: Verkehrsperiode, id: string ) => {
      this.operatingPeriods.push(operatingPeriod);
    });
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
    })
  }

  // isSelected(event: any): any {
  //   const date = moment(event);
  //   return this.selected.find(x => x == date) ? "selected" : null;
  // };

  operatingPeriodSelected(operatingPeriod: Event) {
    console.log(this.selected);
  }
}
