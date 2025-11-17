import {Component, Input} from '@angular/core';
import {TimetableData} from 'src/app/business/timetable-data';
import {Verkehrsperiode} from 'src/app/model/verkehrsperiode';

@Component({
  selector: 'app-file-details-tab',
  templateUrl: './file-details-tab.component.html',
  styleUrls: ['./file-details-tab.component.css']
})
export class FileDetailsTabComponent {

  @Input()
  timetableData: TimetableData;

  protected readonly Verkehrsperiode = Verkehrsperiode;
}
