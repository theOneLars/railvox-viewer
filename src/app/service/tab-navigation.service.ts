import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabNavigationService {

  readonly trainTab = 0;
  readonly operatingPeriodTab = 1;

  subject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  public getTabNavigationEvent(): Observable<number> {
    return this.subject;
  }

  public navigateToTrainTab(): void {
    this.subject.next(this.trainTab);
  }

  public navigateToVPTab(): void {
    this.subject.next(this.operatingPeriodTab);
  }

}
