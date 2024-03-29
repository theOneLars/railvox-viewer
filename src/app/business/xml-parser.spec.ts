import {MeldungVariante, VariantenType} from "../model/meldung-variante";
import {Betriebspunkt} from "../model/betriebspunkt";
import {Tagesleistung} from "../model/tagesleistung";
import {Zug} from "../model/zug";
import {StreckenAbschnitt} from "../model/strecken-abschnitt";
import {Sprache} from "../model/sprache";
import {XmlParser} from "./xml-parser";
import {SprachProvider} from "./test-provider/sprach-provider";
import {Meldung} from "../model/meldung";
import {Traktion} from "../model/traktion";
import {Passage} from "../model/passage";
import {Verkehrsperiode} from "../model/verkehrsperiode";
import {VerkehrsperiodenProvider} from "./test-provider/verkehrsperioden-provider";
import * as moment from "moment";

describe('XmlParser', () => {

  it('should parse list of betriebspunkte', () => {
    let xml =
      '<KISDZStammdaten>' +
      '  <Netz gueltig_ab="2021-12-12T00:00:00.000+01:00" gueltig_bis="2022-12-10T23:59:59.000+01:00">' +
      '    <BetriebspunktListe>' +
      '      <BP id="4086" ak="DAV" kn="true" kx="185025.0" ky="781875.0" ul="85" di="9073" xh="N" yh="E" tr="300.0"' +
      '          name="Davos Platz"></BP>' +
      '      <BP id="4087" ak="DAD" kn="false" kx="187117.0" ky="783432.0" ul="85" di="9072" xh="N" yh="E" tr="300.0"' +
      '          name="Davos Dorf"></BP>' +
      '    </BetriebspunktListe>' +
      '  </Netz>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let actual = testee.mapBetriebspunkte(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('4086')).toEqual(new Betriebspunkt('Davos Platz', 'DAV'));
    expect(actual.get('4087')).toEqual(new Betriebspunkt('Davos Dorf', 'DAD'));
  });

  it('should parse single betriebspunkt', () => {
    let xml =
      '<KISDZStammdaten>' +
      '  <Netz gueltig_ab="2021-12-12T00:00:00.000+01:00" gueltig_bis="2022-12-10T23:59:59.000+01:00">' +
      '    <BetriebspunktListe>' +
      '      <BP id="4087" ak="DAD" kn="false" kx="187117.0" ky="783432.0" ul="85" di="9072" xh="N" yh="E" tr="300.0"' +
      '          name="Davos Dorf"></BP>' +
      '    </BetriebspunktListe>' +
      '  </Netz>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let actual = testee.mapBetriebspunkte(parsedXml);

    expect(actual).toHaveSize(1);
    expect(actual.get('4087')).toEqual(new Betriebspunkt('Davos Dorf', 'DAD'));
  });

  it('should parse list of tagesleistungen', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <Fahrplan>' +
      '     <TL nr="4084">' +
      '      <Z id="203" zn="1008" dk="DAV-LQ" vp_id="4085"></Z>' +
      '      <Z id="204" zn="1009" dk="DAV-LQ-CH" vp_id="4085"></Z>' +
      '    </TL>' +
      '    <TL nr="4085">' +
      '      <Z id="203" zn="1008" dk="DAV-LQ" vp_id="4085"></Z>' +
      '    </TL> ' +
      '  </Fahrplan>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let verkehrsperiode = VerkehrsperiodenProvider.provide_17();
    testee.data.verkehrsperiodeById.set('4085', verkehrsperiode);
    let actual: Tagesleistung[] = testee.mapTagesLeistungen(parsedXml);

    expect(actual).toHaveSize(2);
    let expectedTl0 = new Tagesleistung(
      [
        new Zug('DAV-LQ', '203', '4085', '1008', [], [], verkehrsperiode, Zug.DEFAULT_NO_FOLGEZUG_ID),
        new Zug('DAV-LQ-CH', '204', '4085', '1009', [], [], verkehrsperiode, Zug.DEFAULT_NO_FOLGEZUG_ID)
      ], '4084');
    let expectedTl1 = new Tagesleistung([
      new Zug('DAV-LQ', '203', '4085', '1008', [], [], verkehrsperiode, Zug.DEFAULT_NO_FOLGEZUG_ID)], '4085');
    expect(actual[0]).toEqual(expectedTl0);
    expect(actual[1]).toEqual(expectedTl1);
  });

  it('should parse traktionen', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <Fahrplan>' +
      '     <TL nr="4084">' +
      '      <Z id="203" zn="1203" dk="DAV-LQ" vp_id="4085">' +
      '       <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '         <TR z_id="204"/>' +
      '       </P>' +
      '       <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '         <TR z_id="204"/>' +
      '       </P>' +
      '      </Z>' +
      '    </TL>' +
      '    <TL nr="4085">' +
      '      <Z id="204" zn="1204" dk="DAV-CH" vp_id="4085">' +
      '        <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '          <TR z_id="203"/>' +
      '        </P>' +
      '        <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '          <TR z_id="203"/>' +
      '        </P>' +
      '        </Z>' +
      '    </TL> ' +
      '  </Fahrplan>' +
      '</KISDZStammdaten>';

    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);

    let streckenabschnitt = new StreckenAbschnitt('1234');
    testee.data.streckenabschnitteById.set('4993', streckenabschnitt);
    let betriebspunkt = new Betriebspunkt('Davos Dorf', 'DAD');
    testee.data.betriebspunkById.set('4087', betriebspunkt);
    let passage = new Passage(betriebspunkt, [], '12:08:00.000', '12:09:00.000', streckenabschnitt);
    let verkehrsperiode = VerkehrsperiodenProvider.provide_17();
    testee.data.verkehrsperiodeById.set('4085', verkehrsperiode);

    let actual: Tagesleistung[] = testee.mapTagesLeistungen(parsedXml);
    expect(actual).toHaveSize(2);
    let expectedTl0 = new Tagesleistung(
      [new Zug('DAV-LQ', '203', '4085', '1203', [passage, passage], [new Traktion('204', '1204')], verkehrsperiode, Zug.DEFAULT_NO_FOLGEZUG_ID)]
      , '4084');
    let expectedTl1 = new Tagesleistung(
      [new Zug('DAV-CH', '204', '4085', '1204', [passage, passage], [new Traktion('203', '1203')], verkehrsperiode, Zug.DEFAULT_NO_FOLGEZUG_ID)]
      , '4085');
    expect(actual[0]).toEqual(expectedTl0);
    expect(actual[1]).toEqual(expectedTl1);
  });

  it('should parse follow train number and id', () => {

    let xml =
      '<KISDZStammdaten>' +
      '   <Fahrplan>' +
      '     <TL nr="4084">' +
      '      <Z id="203" zn="1203" dk="DAV-LQ" vp_id="4085">' +
      '       <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '       </P>' +
      '       <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '          <F z_id="204"/>' +
      '       </P>' +
      '      </Z>' +
      '    </TL>' +
      '    <TL nr="4085">' +
      '      <Z id="204" zn="1204" dk="DAV-CH" vp_id="4085">' +
      '        <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '        </P>' +
      '        <P bp_id="4087" nz="12:08:00.000" bz="12:09:00.000" ty="1" s_id="4993">' +
      '          <F z_id="-1"/>' +
      '        </P>' +
      '        </Z>' +
      '    </TL> ' +
      '  </Fahrplan>' +
      '</KISDZStammdaten>';

    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);

    let streckenabschnitt = new StreckenAbschnitt('1234');
    testee.data.streckenabschnitteById.set('4993', streckenabschnitt);
    let betriebspunkt = new Betriebspunkt('Davos Dorf', 'DAD');
    testee.data.betriebspunkById.set('4087', betriebspunkt);
    let passage = new Passage(betriebspunkt, [], '12:08:00.000', '12:09:00.000', streckenabschnitt);
    let verkehrsperiode = VerkehrsperiodenProvider.provide_17();
    testee.data.verkehrsperiodeById.set('4085', verkehrsperiode);

    let actual: Tagesleistung[] = testee.mapTagesLeistungen(parsedXml);
    expect(actual).toHaveSize(2);
    let zugTl1 = new Zug('DAV-LQ', '203', '4085', '1203', [passage, passage], [], verkehrsperiode, '204');
    zugTl1.folgezugNumber = '1204';
    let zugTl2 = new Zug('DAV-CH', '204', '4085', '1204', [passage, passage], [], verkehrsperiode, Zug.DEFAULT_NO_FOLGEZUG_ID);
    let expectedTl0 = new Tagesleistung([zugTl1], '4084');
    let expectedTl1 = new Tagesleistung([zugTl2], '4085');
    expect(actual[0]).toEqual(expectedTl0);
    expect(actual[0].zuege[0].hasFolgezug()).toBeTrue();
    expect(actual[1]).toEqual(expectedTl1);
    expect(actual[1].zuege[0].hasFolgezug()).toBeFalse();
  });

  it('should parse list of streckenabschnitte', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <Netz>' +
      '   <StreckenabschnittListe>' +
      '      <SA id="4088" bb_id="4086" bn_id="4089" di="2669"/>' +
      '      <SA id="4161" bb_id="4089" bn_id="4162" di="3635"/> ' +
      '  </StreckenabschnittListe>' +
      '   </Netz>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let actual = testee.mapStreckenabschnitte(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('4088')).toEqual(new StreckenAbschnitt('2669'));
    expect(actual.get('4161')).toEqual(new StreckenAbschnitt('3635'));
  });

  it('should parse list of bildvarianten', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <VariantenPool>' +
      '   <BildVariantenListe>' +
      '      <BV dn="TFT_RhB10.svg" fo="image//svg" id="4902"/>' +
      '      <BV dn="TFT_Bus_AS_titel.svg" fo="image//svg" id="4943"/>' +
      '  </BildVariantenListe>' +
      '   </VariantenPool>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let actual = testee.mapBildMeldungVarianten(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('4902')).toEqual(new MeldungVariante(VariantenType.BildMeldung, 'image//svg', 'TFT_RhB10.svg', ''));
    expect(actual.get('4943')).toEqual(new MeldungVariante(VariantenType.BildMeldung, 'image//svg', 'TFT_Bus_AS_titel.svg', ''));
  });

  it('should parse list of audiovarianten', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <VariantenPool>' +
      '     <AudioVariantenListe>' +
      '       <AV dn="D_BE_AGZ2.mp3" fo="audio/mpeg3" id="34830"/>' +
      '      <AV dn="D_F072_1x.mp3" fo="audio/mpeg3" id="34835"/>' +
      '   </AudioVariantenListe>' +
      '   </VariantenPool>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let actual = testee.mapAudioMeldungVarianten(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('34830')).toEqual(new MeldungVariante(VariantenType.AudioMeldung, 'audio/mpeg3', 'D_BE_AGZ2.mp3', ''));
    expect(actual.get('34835')).toEqual(new MeldungVariante(VariantenType.AudioMeldung, 'audio/mpeg3', 'D_F072_1x.mp3', ''));
  });

  it('should parse list of textvarianten', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <VariantenPool>' +
      '     <TextVariantenListe>' +
      '       <TV tx="Landquart" id="4904"/>' +
      '       <TV tx="Abfahrt um: 12:00" id="4906"/>' +
      '     </TextVariantenListe>' +
      '   </VariantenPool>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let actual = testee.mapTextMeldungVarianten(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('4904')).toEqual(new MeldungVariante(VariantenType.TextMeldung, '', '', 'Landquart'));
    expect(actual.get('4906')).toEqual(new MeldungVariante(VariantenType.TextMeldung, '', '', 'Abfahrt um: 12:00'));
  });

  it('should parse list of sprachen', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <SprachenListe>' +
      '     <Sprache id="0" co="de" be="Deutsch"/>' +
      '     <Sprache id="4884" co="en" be="Englisch"/>' +
      '   </SprachenListe>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let actual = testee.mapSprachen(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('0')).toEqual(new Sprache('de', 'Deutsch'));
    expect(actual.get('4884')).toEqual(new Sprache('en', 'Englisch'));
  });

  it('should parse list of meldungen with audiomeldungen', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <MeldungListe>' +
      '     <M id="1" am_id="36" am_kc="ela.Innen" name="Landquart" sp_id="3">' +
      '            <AMV pl="0" v_id="10"/>' +
      '            <AMV pl="0" v_id="11"/>' +
      '        </M>' +
      '     <M id="2" am_id="37" am_kc="ela.Sonder" name="Türfreigabe verzögert" sp_id="4">' +
      '            <AMV pl="0" v_id="12"/>' +
      '        </M>' +
      '   </MeldungListe>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);
    let meldungVariante1 = new MeldungVariante(VariantenType.AudioMeldung, 'audio/mpeg3', 'G_MGGONG-1.mp3', '', SprachProvider.german());
    let meldungVariante2 = new MeldungVariante(VariantenType.AudioMeldung, 'audio/mpeg3', 'G_MGGONG-2.mp3', '', SprachProvider.german());
    let meldungVariante3 = new MeldungVariante(VariantenType.AudioMeldung, 'audio/mpeg3', 'G_MGGONG-3.mp3', '', SprachProvider.english());
    testee.data.meldungVarianteById.set('10', meldungVariante1);
    testee.data.meldungVarianteById.set('11', meldungVariante2);
    testee.data.meldungVarianteById.set('12', meldungVariante3);

    testee.data.spracheById.set('3', SprachProvider.german());
    testee.data.spracheById.set('4', SprachProvider.english());

    let actual = testee.mapMeldungen(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('1')).toEqual(
      new Meldung([meldungVariante1, meldungVariante2], 'Landquart', 'ela.Innen', '36', SprachProvider.german()));
    expect(actual.get('2')).toEqual(
      new Meldung([meldungVariante3], 'Türfreigabe verzögert', 'ela.Sonder', '37', SprachProvider.english()));
  });

  it('should parse list of meldungen with bildmeldungen', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <MeldungListe>' +
      '     <M id="1" am_id="49" am_kc="screen.Kopf.ProductInfo" name="Landquart">' +
      '       <BMV v_id="10"/>' +
      '       <BMV v_id="11"/>' +
      '     </M>' +
      '     <M id="2" am_id="51" am_kc="screen.Perlschnur.Umsteigen1" name="Umsteigen Bus">' +
      '       <BMV v_id="12"/>' +
      '     </M>' +
      '   </MeldungListe>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);

    let meldungVariante1 = new MeldungVariante(VariantenType.BildMeldung, 'image//svg', 'TFT_Bus_AS_titel.svg', '');
    let meldungVariante2 = new MeldungVariante(VariantenType.BildMeldung, 'image//svg', 'TFT_GB_AS_titel.svg', '');
    let meldungVariante3 = new MeldungVariante(VariantenType.BildMeldung, 'image//svg', 'TFT_R.svg', '');
    testee.data.meldungVarianteById.set('10', meldungVariante1);
    testee.data.meldungVarianteById.set('11', meldungVariante2);
    testee.data.meldungVarianteById.set('12', meldungVariante3);

    testee.data.spracheById.set('3', SprachProvider.german());
    testee.data.spracheById.set('4', SprachProvider.english());

    let actual = testee.mapMeldungen(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('1')).toEqual(
      new Meldung([meldungVariante1, meldungVariante2], 'Landquart', 'screen.Kopf.ProductInfo', '49'));
    expect(actual.get('2')).toEqual(
      new Meldung([meldungVariante3], 'Umsteigen Bus', 'screen.Perlschnur.Umsteigen1', '51'));
  });

  it('should parse list of meldungen with textmeldungen', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <MeldungListe>' +
      '     <M id="1" am_id="62" am_kc="screen.Text.Linie" name="Landquart">' +
      '       <TMV v_id="10"/>' +
      '       <TMV v_id="11"/>' +
      '     </M>' +
      '     <M id="2" am_id="10"  am_kc="anz.Front.K1Zugtyp1" name="Landquart">' +
      '       <TMV v_id="12"/>' +
      '     </M>' +
      '   </MeldungListe>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);

    let meldungVariante1 = new MeldungVariante(VariantenType.TextMeldung, '', '', 'Allegra, die Rhätische Bahn begrüsst Sie im RhB10 nach Küblis.');
    let meldungVariante2 = new MeldungVariante(VariantenType.TextMeldung, '', '', 'Abfahrt um: 12:00');
    let meldungVariante3 = new MeldungVariante(VariantenType.TextMeldung, '', '', 'Küblis');
    testee.data.meldungVarianteById.set('10', meldungVariante1);
    testee.data.meldungVarianteById.set('11', meldungVariante2);
    testee.data.meldungVarianteById.set('12', meldungVariante3);

    testee.data.spracheById.set('3', SprachProvider.german());
    testee.data.spracheById.set('4', SprachProvider.english());

    let actual = testee.mapMeldungen(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('1')).toEqual(
      new Meldung([meldungVariante1, meldungVariante2], 'Landquart', 'screen.Text.Linie', '62'));
    expect(actual.get('2')).toEqual(
      new Meldung([meldungVariante3], 'Landquart', 'anz.Front.K1Zugtyp1', '10'));
  });

  it('should parse list of verkehrsperioden', () => {
    let xml =
      '<KISDZStammdaten>' +
      '   <Fahrplan gueltig_ab="2021-12-12T00:00:00.000+01:00" gueltig_bis="2022-12-10T23:59:59.000+01:00">' +
      '        <VerkehrsperiodeListe>   ' +
      '           <VP id="1" co="22*" fm="0000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000"/>\n' +
      '           <VP id="2" co="generated" fm="0000000000000000000000000000000000000000000000000000000000000000000000020408102040810204081"/>' +
      '        </VerkehrsperiodeListe>   ' +
      '   </Fahrplan>' +
      '</KISDZStammdaten>';
    let testee = new XmlParser();
    let parsedXml = testee.parseXml(xml);

    let actual = testee.mapVerkehrsperioden(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('1')).toEqual(new Verkehrsperiode('1', '22*', '2021-12-12T00:00:00.000+01:00', '2022-12-10T23:59:59.000+01:00', '0000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000'));
    expect(actual.get('2')).toEqual(new Verkehrsperiode('2', 'generated', '2021-12-12T00:00:00.000+01:00', '2022-12-10T23:59:59.000+01:00', '0000000000000000000000000000000000000000000000000000000000000000000000020408102040810204081'));
  });

  it('should work', () => {
    console.log(moment("25-12-1995", "DD-MM-YYYY").toString());
    let date = moment("25-12-1995", "DD-MM-YYYY");
    console.log('fuck you! ' + date.days() + '-' + date.month() + '-' + date.year());
  });
});
