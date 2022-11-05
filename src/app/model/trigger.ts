import {Meldung} from "./meldung";

export class Trigger {

  typ: TriggerType;
  name: string;
  value: string;
  meldungen: Meldung[];

  constructor(typ: string, name: string, value: string, meldungen: Meldung[]) {
    this.typ = Trigger.getTriggerType(typ);
    this.name = name;
    this.value = value;
    this.meldungen = meldungen;
  }

  public typeAsString(): string {
    return TriggerType[this.typ];
  }

  public isOfType(type: TriggerType): boolean {
    return this.typ === type;
  }

  public isInit(): boolean {
    return this.isOfType(TriggerType.init);
  }

  public isManuell(): boolean {
    return this.isOfType(TriggerType.manuell);
  }

  public isDistanz(): boolean {
    return this.isOfType(TriggerType.distanz);
  }

  public isZeitstation(): boolean {
    return this.isOfType(TriggerType.zeitstation);
  }

  public isZeitevent(): boolean {
    return this.isOfType(TriggerType.zeitevent);
  }

  public isUnknown(): boolean {
    return this.isOfType(TriggerType.unknown);
  }

  static getTriggerType(asString: string): TriggerType {
    switch (asString) {
      case 'init':
        return TriggerType.init;
      case 'manuell':
        return TriggerType.manuell;
      case 'distanz':
        return TriggerType.distanz;
      case 'zeitstation':
        return TriggerType.zeitstation;
      case 'zeitevent':
        return TriggerType.zeitevent;
      default:
        new Error('unknown TriggerType: ' + asString);
    }
    return TriggerType.unknown;
  }

}

export enum TriggerType {

  init,
  manuell,
  distanz,
  zeitstation,
  zeitevent,
  unknown
}
