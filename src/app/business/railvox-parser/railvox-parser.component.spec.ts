import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RailvoxParserComponent} from './railvox-parser.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Betriebspunkt} from "../../model/betriebspunkt";

describe('RailvoxParserComponent', () => {
  let component: RailvoxParserComponent;
  let fixture: ComponentFixture<RailvoxParserComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
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

  it('should parse', () => {
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

});
