import { Component, OnInit } from '@angular/core';
import {FileUploadService} from "../../service/file-upload.service";
import {InputFile} from "../../model/input-file";

@Component({
  selector: 'file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.css']
})
export class FileDropComponent implements OnInit {

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  fileBrowserHandler(event: any) {
    this.fileUploadService.emitFile(new InputFile(event.files[0]))
  }

}
