import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TrainTabFilterConfig} from "../model/train-tab-filter-config";

@Injectable({
  providedIn: 'root'
})
export class TrainTabService {

  subject: BehaviorSubject<TrainTabFilterConfig> = new BehaviorSubject<TrainTabFilterConfig>(new TrainTabFilterConfig());

  constructor() { }

  public getEvent(): Observable<TrainTabFilterConfig> {
    return this.subject;
  }

  public emitFilterConfig(config: TrainTabFilterConfig): void {
    return this.subject.next(config);
  }

}
