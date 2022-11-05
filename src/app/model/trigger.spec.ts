import {Trigger, TriggerType} from "./trigger";

describe('Trigger', () => {

  it('should parse trigger type', () => {
    expect(new Trigger('init', '', '', []).typ).toBe(TriggerType.init);
    expect(new Trigger('manuell', '', '', []).typ).toBe(TriggerType.manuell);
    expect(new Trigger('distanz', '', '', []).typ).toBe(TriggerType.distanz);
    expect(new Trigger('zeitstation', '', '', []).typ).toBe(TriggerType.zeitstation);
    expect(new Trigger('zeitevent', '', '', []).typ).toBe(TriggerType.zeitevent);
    expect(new Trigger('someText', '', '', []).typ).toBe(TriggerType.unknown);
  });

  it('should return proper type', () => {
    let trigger = new Trigger('init', '', '', []);
    expect(trigger.isOfType(TriggerType.init)).toBeTrue();
    expect(trigger.isOfType(TriggerType.manuell)).toBeFalse();
  })

  it('should return proper string for type', () => {
    let trigger = new Trigger('init', '', '', []);
    expect(trigger.typeAsString()).toBe('init');
  })

});
