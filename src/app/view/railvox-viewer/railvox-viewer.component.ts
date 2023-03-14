import {Component, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TimetableData} from "../../business/timetable-data";
import {XmlParser} from "../../business/xml-parser";
import {FileUploadService} from "../../service/file-upload.service";
import {InputFile} from "../../model/input-file";
import {MessageService} from "../../service/message.service";
import {TabNavigationService} from "../../service/tab-navigation.service";

@Component({
  selector: 'railvox-viewer',
  templateUrl: './railvox-viewer.component.html',
  styleUrls: ['./railvox-viewer.component.css']
})
export class RailvoxViewerComponent implements OnDestroy {

  data: TimetableData;
  tabindex: number = 0;

  constructor(private http: HttpClient,
              private tabNavigationService: TabNavigationService,
              private fileUploadService: FileUploadService,
              private messageService: MessageService) {
    // this.loadXML();
    this.fileUploadService.getEvent()
      .subscribe((event: InputFile) => {
        this.data = new XmlParser().parseExport(event.content);
        this.messageService.sendMessage('Import done');
      });
    this.tabNavigationService.getTabNavigationEvent().subscribe(targetTabIndex => {
      this.tabindex = targetTabIndex;
    });
  }

  ngOnDestroy(): void {
    this.data = new TimetableData();
  }

  loadXML(): void {
    this.http.get('assets/export.xml',
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

}

