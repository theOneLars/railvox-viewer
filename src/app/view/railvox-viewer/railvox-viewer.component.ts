import {Component, inject, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TimetableData} from "../../business/timetable-data";
import {XmlParser} from "../../business/xml-parser";
import {FileUploadService} from "../../service/file-upload.service";
import {InputFile} from "../../model/input-file";
import {MessageService} from "../../service/message.service";
import {TabNavigationService} from "../../service/tab-navigation.service";
import {FileStreamer} from 'src/app/business/file-streamer';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProgressDialogComponent} from 'src/app/view/railvox-viewer/progress-dialog/progress-dialog.component';

@Component({
  selector: 'railvox-viewer',
  templateUrl: './railvox-viewer.component.html',
  styleUrls: ['./railvox-viewer.component.css']
})
export class RailvoxViewerComponent implements OnDestroy {

  data: TimetableData;
  tabindex: number = 0;
  parseProgress: number = 0;
  dialogRef: MatDialogRef<ProgressDialogComponent>

  constructor(private http: HttpClient,
              private tabNavigationService: TabNavigationService,
              private fileUploadService: FileUploadService,
              private messageService: MessageService,
              private dialog: MatDialog) {

    this.fileUploadService.getEvent()
      .subscribe(async (event: InputFile) => {
        this.openDialog();
        let streamer = new FileStreamer(event.file)
        let parser = new XmlParser();
        let totalChunks = event.file.size / streamer.defaultChunkSize;
        let chunkCount = 0;
        while (!streamer.isEndOfFile()) {
          chunkCount ++;
          this.parseProgress = chunkCount / totalChunks * 100
          this.updateDialog();
          const data = await streamer.readBlockAsText();
          parser.parseChunk(data)
        }
        this.data = parser.finishParsing();
        this.messageService.sendMessage('Import done');
        this.hideDialog()
      });
    this.tabNavigationService.getTabNavigationEvent().subscribe(targetTabIndex => {
      this.tabindex = targetTabIndex;
    });
  }

  ngOnDestroy(): void {
    this.data = new TimetableData();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(ProgressDialogComponent, {
      disableClose: true,
      // width: '250px',
      role: 'alertdialog',
      data: {
        progress: Math.round(this.parseProgress)
      } })
  }

  updateDialog() {
    this.dialogRef.componentInstance.data = {
      progress: Math.round(this.parseProgress)
    }
  }

  hideDialog() {
    this.dialog.closeAll();
  }

}

