import {MeldungVariante} from "./meldung-variante";
import {Tagesleistung} from "./tagesleistung";
import {Zug} from "./zug";
import {VerkehrsperiodenProvider} from "../business/test-provider/verkehrsperioden-provider";

describe('MeldungVariante', () => {

  it('should filter trainnumber ', () => {
    let zug = new Zug('dk', '123', '1', '7124', [], [], VerkehrsperiodenProvider.provide_17(), Zug.DEFAULT_NO_FOLGEZUG_ID)
    let testee = new Tagesleistung([zug], '1111');

    expect(testee.hasTrainWithNumber('7124')).toBeTrue();
    expect(testee.hasTrainWithNumber('71240')).toBeFalse();
    expect(testee.hasTrainWithNumber('712')).toBeFalse();
  });

});
