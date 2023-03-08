import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import * as moment from "moment";
import {Moment} from "moment";
import {Tagesleistung} from "../../../model/tagesleistung";
import {TimetableData} from "../../../business/timetable-data";

@Component({
  selector: 'trains-overview',
  templateUrl: './trains-overview.component.html',
  styleUrls: ['./trains-overview.component.css']
})
export class TrainsOverviewComponent implements OnInit {

  @Input()
  timetableData: TimetableData;

  zugnummerFilter = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]);
  tagFilter = new FormControl(moment(), [Validators.required]);

  filteredTagesleistungen: Tagesleistung[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  filterTagesleistungen() {
    if (this.zugnummerFilter.valid && this.tagFilter.valid) {
      let zugnummer: string = this.zugnummerFilter.value || '';
      let day = this.tagFilter.value;
      this.filteredTagesleistungen = this.timetableData.tagesLeistungen
        .filter(tl => tl.hasTrainWithNumber(zugnummer))
        .filter(tl => tl.hasTrainValidForDay(<Moment>day));
    }
  }

}
