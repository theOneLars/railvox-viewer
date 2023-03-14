import {Injectable} from '@angular/core';
import {OperatingPeriodTabFilterConfig} from "../model/operating-period-tab-filter-config";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OperatingPeriodViewService {

  subject: BehaviorSubject<OperatingPeriodTabFilterConfig> = new BehaviorSubject<OperatingPeriodTabFilterConfig>(new OperatingPeriodTabFilterConfig());

  constructor() { }

  public getEvent(): Observable<OperatingPeriodTabFilterConfig> {
    return this.subject;
  }

  public emitFilterConfig(viewModel: OperatingPeriodTabFilterConfig): void {
    return this.subject.next(viewModel);
  }
}
