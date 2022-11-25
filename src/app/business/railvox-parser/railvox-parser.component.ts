import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Tagesleistung} from "../../model/tagesleistung";
import {FormControl, Validators} from "@angular/forms";
import {TimetableData} from "../timetable-data";
import {XmlParser} from "../xml-parser";
import {FileUploadService} from "../../service/file-upload.service";
import {InputFile} from "../../model/input-file";
import {Moment} from "moment";
import * as moment from "moment";
import {MessageService} from "../../service/message.service";

@Component({
  selector: 'app-railvox-parser',
  templateUrl: './railvox-parser.component.html',
  styleUrls: ['./railvox-parser.component.css']
})
export class RailvoxParserComponent implements OnDestroy {

  zugnummerFilter = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]);
  tagFilter = new FormControl(moment(), [Validators.required]);
  filteredTagesleistungen: Tagesleistung[] = [];

  data: TimetableData;

  constructor(private http: HttpClient, private fileUploadService: FileUploadService, private messageService: MessageService) {
    // this.loadXML();
    this.fileUploadService.getEvent()
      .subscribe((event: InputFile) => {
        this.data = new XmlParser().parseExport(event.content);
        this.messageService.sendMessage('Import done');
      });
  }

  ngOnDestroy(): void {
    this.data = new TimetableData();
  }

  loadXML(): void {
    this.http.get('assets/exportRTZ.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.data = new XmlParser().parseExport(data);
      });
  }

  filterTagesleistungen() {
    if (this.zugnummerFilter.valid && this.tagFilter.valid) {
      let zugnummer: string = this.zugnummerFilter.value || '';
      let day = this.tagFilter.value;
      this.filteredTagesleistungen = this.data.tagesLeistungen
        .filter(tl => tl.hasTrainWithNumber(zugnummer))
        .filter(tl => tl.hasTrainValidForDay(<Moment>day));
    }
  }
}

