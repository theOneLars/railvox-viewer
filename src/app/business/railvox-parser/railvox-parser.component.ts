import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Betriebspunkt} from "../../model/betriebspunkt";
import {XMLParser} from "fast-xml-parser";
import {Tagesleistung} from "../../model/tagesleistung";
import {Zug} from "../../model/zug";
import {Passage} from "../../model/passage";
import {Trigger} from "../../model/trigger";
import {StreckenAbschnitt} from "../../model/strecken-abschnitt";
import {FormControl, Validators} from "@angular/forms";
import {MeldungVariante} from "../../model/meldung-variante";

@Component({
  selector: 'app-railvox-parser',
  templateUrl: './railvox-parser.component.html',
  styleUrls: ['./railvox-parser.component.css']
})
export class RailvoxParserComponent implements OnInit, OnDestroy {

  zugnummerFilter = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]);

  showSpinner: boolean = true;
  title: string = '';
  betriebspunkById = new Map<string, Betriebspunkt>();
  streckenabschnitte = new Map<string, StreckenAbschnitt>();
  meldungVarianteById = new Map<string, MeldungVariante>();
  tagesLeistungen: Tagesleistung[] = [];

  filteredTagesleistungen: Tagesleistung[] = [];

  constructor(private http: HttpClient) {
    this.loadXML();
  }

  ngOnDestroy(): void {
    this.betriebspunkById = new Map<string, Betriebspunkt>();
    this.streckenabschnitte = new Map<string, StreckenAbschnitt>();
    this.meldungVarianteById = new Map<string, MeldungVariante>();
    this.tagesLeistungen = [];
    this.filteredTagesleistungen = [];
  }

  //getting data function
  loadXML(): void {
    /*Read Data*/
    this.http.get('assets/exportRTZ.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseExport(data);
        this.showSpinner = false;
      });
  }

  public parseExport(data: string) {
    let parsedXML = this.parseXml(data);
    this.title = parsedXML.KISDZStammdaten['@_fahrplanversion'] + ' - ' + parsedXML.KISDZStammdaten['@_zielsystem']
    this.betriebspunkById = this.mapBetriebspunkte(parsedXML);
    this.meldungVarianteById = new Map([
      ...this.mapAudioMeldungVarianten(parsedXML),
      ...this.mapTextMeldungVarianten(parsedXML),
      ...this.mapBildMeldungVarianten(parsedXML)]);
    console.log('meldungVarianteById', this.meldungVarianteById);
    this.tagesLeistungen = this.mapTagesLeistungen(parsedXML);
    this.streckenabschnitte = this.mapStreckenabschnitte(parsedXML);
  }

  public parseXml(data: string) {
    const options = {
      ignoreAttributes: false,
      allowBooleanAttributes: true,
      attributeNamePrefix: "@_"
    };
    let fastXmlParser = new XMLParser(options);
    return fastXmlParser.parse(data, {});
  }

  public mapBetriebspunkte(parsedXML: any): Map<string, Betriebspunkt> {
    let betriebspunkte: any = this.ensureCollection(parsedXML.KISDZStammdaten.Netz.BetriebspunktListe.BP);
    let result = new Map<string, Betriebspunkt>();
    betriebspunkte.forEach((it: any) => result.set(it['@_id'], new Betriebspunkt(it['@_name'], it['@_ak'])));
    return result;
  }

  public mapStreckenabschnitte(parsedXML: any): Map<string, StreckenAbschnitt> {
    let streckenabschnitte: any = this.ensureCollection(parsedXML.KISDZStammdaten.Netz.StreckenabschnittListe.SA);
    let result = new Map<string, StreckenAbschnitt>();
    streckenabschnitte.forEach((streckenabschnitt: any) => {
      result.set(streckenabschnitt['@_id'], new StreckenAbschnitt(streckenabschnitt['@_di']))
    })
    return result;
  }

  public mapTagesLeistungen(parsedXML: any): Tagesleistung[] {
    let tagesleistungen = this.ensureCollection(parsedXML.KISDZStammdaten.Fahrplan.TL);
    let result: Tagesleistung[] = [];
    for (let tagesleistung of tagesleistungen) {
      let zuege = this.ensureCollection(tagesleistung.Z);
      let trains: Zug[] = [];
      zuege.forEach((zug: any) => {
        trains.push(new Zug(zug['@_dk'], zug['@_id'], zug['@_vp_id'], zug['@_zn'], this.mapPassages(zug)))
      });
      let tl = new Tagesleistung(trains, tagesleistung['@_nr']);
      result.push(tl);
    }
    return result;
  }

  public mapAudioMeldungVarianten(parsedXML: any): Map<string, MeldungVariante> {
    let result = new Map<string, MeldungVariante>();
    let meldungen = this.ensureCollection(parsedXML.KISDZStammdaten.VariantenPool.AudioVariantenListe.AV);
    meldungen.forEach((meldung: any) => {
      result.set(meldung['@_id'], new MeldungVariante('AudioMeldung', meldung['@_fo'], meldung['@_dn'], ''));
    })
    return result;
  }

  public mapBildMeldungVarianten(parsedXML: any): Map<string, MeldungVariante> {
    let result = new Map<string, MeldungVariante>();
    let meldungen = this.ensureCollection(parsedXML.KISDZStammdaten.VariantenPool.BildVariantenListe.BV);
    meldungen.forEach((meldung: any) => {
      result.set(meldung['@_id'], new MeldungVariante('BildMeldung', meldung['@_fo'], meldung['@_dn'], ''));
    })
    return result;
  }

  public mapTextMeldungVarianten(parsedXML: any): Map<string, MeldungVariante> {
    let result = new Map<string, MeldungVariante>();
    let meldungen = this.ensureCollection(parsedXML.KISDZStammdaten.VariantenPool.TextVariantenListe.TV);
    meldungen.forEach((meldung: any) => {
      result.set(meldung['@_id'], new MeldungVariante('TextMeldung', '', '', meldung['@_tx']));
    })
    return result;
  }

  public mapPassages(zugJSON: any): Passage[] {
    let passages = this.ensureCollection(zugJSON.P);
    let result: Passage[] = [];
    passages.forEach((passage: any) => {
      if (passage) {
        // @ts-ignore
        let betriebspunkt: Betriebspunkt = this.betriebspunkById.get(passage['@_bp_id']);
        if (typeof betriebspunkt === 'undefined') {
          console.error('Could not find Betriebspunkt witd id: ', passage['@_bp_id']);
          betriebspunkt = new Betriebspunkt('Not existing Betriebspunkt', "NONE")
        }
        // @ts-ignore
        let streckenabschnitt: StreckenAbschnitt = this.streckenabschnitte.get(passage['@_s_id']);
        let trigger = this.mapTrigger(passage);
        result.push(new Passage(betriebspunkt, trigger, [], passage['@_nz'], passage['@_bz'], streckenabschnitt));
      }
    });
    return result
  }

  public mapTrigger(passageJSON: any): Trigger[] {
    let triggers = this.ensureCollection(passageJSON.T);
    let result: Trigger[] = [];
    triggers.forEach((trigger: any) => {

      if (trigger && trigger.TP) {
        result.push(new Trigger(trigger['@_kc'], trigger.TP['@_na'], trigger.TP['@_we']));
      } else if (trigger) {
        result.push(new Trigger(trigger['@_kc'], 'no name', 'no value'));
      }
    })
    return result;
  }

  protected ensureCollection(items: any): any [] {
    if (items instanceof Array) {
      return items;
    }
    let result = [];
    result.push(items);
    return result;
  }

  ngOnInit(): void {
  }

  filterTagesleistungen() {
    if (this.zugnummerFilter.valid) {
      let zugnummer: string = this.zugnummerFilter.value || '';
      this.filteredTagesleistungen = this.tagesLeistungen.filter(tl => tl.hasTrainWithNumber(zugnummer));
    }
  }
}

