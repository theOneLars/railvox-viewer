import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Betriebspunkt} from "../../model/betriebspunkt";
import {XMLParser} from "fast-xml-parser";
import {Tagesleistung} from "../../model/tagesleistung";
import {Zug} from "../../model/zug";

@Component({
  selector: 'app-railvox-parser',
  templateUrl: './railvox-parser.component.html',
  styleUrls: ['./railvox-parser.component.css']
})
export class RailvoxParserComponent implements OnInit {

  title: string = '';
  betriebspunkById = new Map<string, Betriebspunkt>();
  tagesLeistungen: Tagesleistung[] = [];

  constructor(private http: HttpClient) {
    this.loadXML();
  }

  //getting data function
  loadXML(): void {
    /*Read Data*/
    this.http.get('assets/export.xml',
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
      });
  }

  public parseExport(data: string) {
    let parsedXML = this.parseXml(data);
    this.title = parsedXML.KISDZStammdaten['@_fahrplanversion'] + ' - ' + parsedXML.KISDZStammdaten['@_zielsystem']
    this.betriebspunkById = this.mapBetriebspunkte(parsedXML);
    this.tagesLeistungen = this.mapTagesLeistungen(parsedXML)
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

  public mapTagesLeistungen(parsedXML: any): Tagesleistung[] {
    let tagesleistungen = this.ensureCollection(parsedXML.KISDZStammdaten.Fahrplan.TL);
    let result: Tagesleistung[] = [];
    for (let tagesleistung of tagesleistungen) {
      let zuege = this.ensureCollection(tagesleistung.Z);
      let trains: Zug[] = [];
      zuege.forEach((zug: any) => {
        trains.push(new Zug(zug['@_dk'], zug['@_id'], zug['@_vp_id'], zug['@_zn'], []))
      });
      let tl = new Tagesleistung(trains, tagesleistung['@_nr']);
      result.push(tl);
    }
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

}
