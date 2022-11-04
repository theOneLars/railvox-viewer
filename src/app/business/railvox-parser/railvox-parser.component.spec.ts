import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RailvoxParserComponent} from './railvox-parser.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Betriebspunkt} from "../../model/betriebspunkt";
import {Tagesleistung} from "../../model/tagesleistung";
import {Zug} from "../../model/zug";
import {StreckenAbschnitt} from "../../model/strecken-abschnitt";
import {MatCardModule} from "@angular/material/card";

describe('RailvoxParserComponent', () => {
  let component: RailvoxParserComponent;
  let fixture: ComponentFixture<RailvoxParserComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatCardModule],
      providers: [HttpClient],
      declarations: [RailvoxParserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RailvoxParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
    let parsedXml = component.parseXml(xml);
    let actual = component.mapBetriebspunkte(parsedXml);

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
    let parsedXml = component.parseXml(xml);
    let actual = component.mapBetriebspunkte(parsedXml);

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
      '      <Z id="203" zn="1008" dk="DAV-LQ" vp_id="4085">' +
      '      </Z>' +
      '    </TL> ' +
      '  </Fahrplan>' +
      '</KISDZStammdaten>';
    let parsedXml = component.parseXml(xml);
    let actual: Tagesleistung[] = component.mapTagesLeistungen(parsedXml);

    expect(actual).toHaveSize(2);
    let expectedTl0 = new Tagesleistung(
      [
        new Zug('DAV-LQ', '203', '4085', '1008', []),
        new Zug('DAV-LQ-CH', '204', '4085', '1009', [])
      ], '4084');
    let expectedTl1 = new Tagesleistung([
      new Zug('DAV-LQ', '203', '4085', '1008', [])], '4085');
    expect(actual[0]).toEqual(expectedTl0);
    expect(actual[1]).toEqual(expectedTl1);
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
    let parsedXml = component.parseXml(xml);
    let actual = component.mapStreckenabschnitte(parsedXml);

    expect(actual).toHaveSize(2);
    expect(actual.get('4088')).toEqual(new StreckenAbschnitt('2669'));
    expect(actual.get('4161')).toEqual(new StreckenAbschnitt('3635'));
  });

});
