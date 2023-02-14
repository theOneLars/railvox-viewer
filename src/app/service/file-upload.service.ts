import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {InputFile} from "../model/input-file";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  subject = new Subject<InputFile>();

  constructor() { }

  public getEvent(): Observable<InputFile> {
    return this.subject;
  }

  public emitFile(inputFile: InputFile): void {
    return this.subject.next(inputFile);
  }
}
