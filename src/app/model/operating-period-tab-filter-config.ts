import {Verkehrsperiode} from "./verkehrsperiode";

export class OperatingPeriodTabFilterConfig {

  current: Verkehrsperiode;

  public hasData(): boolean {
    return !!this.current;
  }

}
