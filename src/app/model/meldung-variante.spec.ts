import {MeldungVariante, VariantenType} from "./meldung-variante";

describe('MeldungVariante', () => {

  it('should detect BildMeldungVariante', () => {
    let testee = new MeldungVariante(VariantenType.BildMeldung, '', '', '');
    expect(testee.isBildMeldungVariante()).toBeTruthy();
  });

  it('should detect AudioMeldungVariante', () => {
    let testee = new MeldungVariante(VariantenType.AudioMeldung, '', '', '');
    expect(testee.isAudioMeldungVariante()).toBeTruthy();
  });

  it('should detect TextMeldungVariante', () => {
    let testee = new MeldungVariante(VariantenType.TextMeldung, '', '', '');
    expect(testee.isTextMeldungVariante()).toBeTruthy();
  });

});
