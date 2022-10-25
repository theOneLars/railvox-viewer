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
    const options = {
      ignoreAttributes: false,
      allowBooleanAttributes: true,
      attributeNamePrefix: "@_"
    };
    let fastXmlParser = new XMLParser(options);
    let parsedXML = fastXmlParser.parse(data, {});

    console.info('parsed xml', parsedXML);

    this.title = parsedXML.KISDZStammdaten['@_fahrplanversion'] + ' - ' + parsedXML.KISDZStammdaten['@_zielsystem']
    this.mapBetriebspunkte(parsedXML.KISDZStammdaten.Netz.BetriebspunktListe.BP);
    this.mapTagesLeistungen(parsedXML.KISDZStammdaten.Fahrplan.TL)
  }

  private mapBetriebspunkte(betriebspunkte: any[]): void {
    betriebspunkte.forEach(it => this.betriebspunkById.set(it['@_id'], new Betriebspunkt(it['@_name'], it['@_ak'])));
  }

  private mapTagesLeistungen(tagesleistungen: any[]) {
    console.info(tagesleistungen);
    tagesleistungen.forEach((tagesleistung) => {
      let zuege: any[] = [];
      zuege.push(tagesleistung.Z);
      let trains: Zug[] = [];
      zuege.forEach((zug: any) => {
        trains.push(new Zug(zug['@_dk'], zug['@_id'], zug['@_vp_id'], zug['@_zn'], []))
      });
      let tl = new Tagesleistung(trains, tagesleistung['@_nr']);
      this.tagesLeistungen.push(tl);
    });
    console.info(this.tagesLeistungen);
  }

  ngOnInit(): void {
  }

}
