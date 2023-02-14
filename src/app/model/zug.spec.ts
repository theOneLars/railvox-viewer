import {Zug} from "./zug";
import {VerkehrsperiodenProvider} from "../business/test-provider/verkehrsperioden-provider";

describe('Zug', () => {

  it('should detect no follow train', () => {
    let vp = VerkehrsperiodenProvider.provide_17();
    let testee = new Zug('dk', '1', 'vp-1', '1234', [], [], vp, Zug.DEFAULT_NO_FOLGEZUG_ID)
    expect(testee.hasFolgezug()).toBeFalse();
  });

  it('should detect no follow train when train id is empty', () => {
    let vp = VerkehrsperiodenProvider.provide_17();
    let testee = new Zug('dk', '1', 'vp-1', '1234', [], [], vp, '')
    expect(testee.hasFolgezug()).toBeFalse();
  });

  it('should detect follow train when follow train id is set', () => {
    let vp = VerkehrsperiodenProvider.provide_17();
    let testee = new Zug('dk', '1', 'vp-1', '1234', [], [], vp, 'id-123')
    expect(testee.hasFolgezug()).toBeTrue();
  });
});
