import {Betriebspunkt} from "../model/betriebspunkt";
import {StreckenAbschnitt} from "../model/strecken-abschnitt";
import {MeldungVariante, VariantenType} from "../model/meldung-variante";
import {Sprache} from "../model/sprache";
import {Meldung} from "../model/meldung";
import {Tagesleistung} from "../model/tagesleistung";
import {XMLParser} from "fast-xml-parser";
import {Predicate} from "@angular/core";
import {Zug} from "../model/zug";
import {Passage} from "../model/passage";
import {Trigger} from "../model/trigger";
import {TimetableData} from "./timetable-data";
import {Traktion} from "../model/traktion";
import {Verkehrsperiode} from "../model/verkehrsperiode";

const moment = require('moment');

export class XmlParser {

  data: TimetableData = new TimetableData();

  public parseExport(xml: string): TimetableData {
    let parsedXML = this.parseXml(xml);
    this.data = new TimetableData();
    this.data.betriebspunkById = this.mapBetriebspunkte(parsedXML);
    this.data.spracheById = this.mapSprachen(parsedXML);
    this.data.verkehrsperiodeById = this.mapVerkehrsperioden(parsedXML);
    this.data.meldungVarianteById = new Map([
      ...this.mapAudioMeldungVarianten(parsedXML),
      ...this.mapTextMeldungVarianten(parsedXML),
      ...this.mapBildMeldungVarianten(parsedXML)]);
    this.data.meldungenById = this.mapMeldungen(parsedXML);
    this.data.tagesLeistungen = this.mapTagesLeistungen(parsedXML);
    this.data.streckenabschnitteById = this.mapStreckenabschnitte(parsedXML);
    this.data.title = this.mapTitle(parsedXML);
    return this.data;
  }

  private mapTitle(parsedXML: any): string {
    let verkehrsperiode: Verkehrsperiode = <Verkehrsperiode> this.data.verkehrsperiodeById.get([... this.data.verkehrsperiodeById.keys()][0]);
    let result =  parsedXML.KISDZStammdaten['@_fahrplanversion'] + ' - ' + parsedXML.KISDZStammdaten['@_zielsystem'];
    result += ' (' + verkehrsperiode.fromDate.format("DD.MM.YYYY") + ' - ' + verkehrsperiode.toDate.format("DD.MM.YYYY") + ')';
    return result;
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

  public mapVerkehrsperioden(parsedXML: any): Map<string, Verkehrsperiode> {
    let result = new Map<string, Verkehrsperiode>();
    let validFrom = parsedXML.KISDZStammdaten.Fahrplan['@_gueltig_ab'];
    let validTo = parsedXML.KISDZStammdaten.Fahrplan['@_gueltig_bis'];
    let verkehrspersiden = this.ensureCollection(parsedXML.KISDZStammdaten.Fahrplan.VerkehrsperiodeListe.VP);
    verkehrspersiden.forEach(vp => {
      result.set(vp['@_id'], new Verkehrsperiode(vp['@_id'], vp['@_co'], validFrom, validTo, vp['@_fm']));
    })
    return result;
  }

  public mapSprachen(parsedXML: any): Map<string, Sprache> {
    let sprachen: any = this.ensureCollection(parsedXML.KISDZStammdaten.SprachenListe.Sprache);
    let result = new Map<string, Sprache>();
    sprachen.forEach((sprache: any) => {
      result.set(sprache['@_id'], new Sprache(sprache['@_co'], sprache['@_be']));
    })
    return result;
  }

  mapMeldungen(parsedXML: any): Map<string, Meldung> {
    let meldungen: any = this.ensureCollection(parsedXML.KISDZStammdaten.MeldungListe.M);
    let result = new Map<string, Meldung>();
    meldungen.forEach((meldung: any) => {
      let varianten: MeldungVariante[] = [];
      this.ensureCollection(meldung.AMV)
        .filter(XmlParser.notUndefined())
        .forEach((amv: any) => varianten.push(<MeldungVariante>this.data.meldungVarianteById.get(amv['@_v_id'])))
      this.ensureCollection(meldung.BMV)
        .filter(XmlParser.notUndefined())
        .forEach((bmv: any) => varianten.push(<MeldungVariante>this.data.meldungVarianteById.get(bmv['@_v_id'])))
      this.ensureCollection(meldung.TMV)
        .filter(XmlParser.notUndefined())
        .forEach((bmv: any) => varianten.push(<MeldungVariante>this.data.meldungVarianteById.get(bmv['@_v_id'])))
      // todo: add functionality for playlists
      let playlistMeldungen = this.ensureCollection(meldung.PMV);
      if (playlistMeldungen.length > 0) {
        new Error('Not yet implemented');
      }
      let sprache: Sprache = <Sprache>this.data.spracheById.get(meldung['@_sp_id']);
      result.set(meldung['@_id'],
        new Meldung(varianten, meldung['@_name'], meldung['@_am_kc'], meldung['@_am_id'], sprache))
    })

    return result;
  }

  private static notUndefined(): Predicate<boolean> {
    return (it: any) => typeof it !== 'undefined';
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
    let zugNummerById = new Map<string, string>();
    for (let tagesleistung of tagesleistungen) {
      let zuege = this.ensureCollection(tagesleistung.Z);
      let trains: Zug[] = [];
      zuege.forEach((zug: any) => {
        zugNummerById.set(zug['@_id'], zug['@_zn']);
        trains.push(new Zug(zug['@_dk'], zug['@_id'], zug['@_vp_id'], zug['@_zn'],
          this.mapPassages(zug), this.mapTraktionen(zug), <Verkehrsperiode> this.data.verkehrsperiodeById.get(zug['@_vp_id']), this.mapFolgezugId(zug)));
      });
      let tl = new Tagesleistung(trains, tagesleistung['@_nr']);
      result.push(tl);
    }

    result.flatMap(tl => tl.zuege)
      .forEach(zug => {
        if (zug.hasFolgezug()) {
          zug.folgezugNumber = <string>zugNummerById.get(zug.folgezugId);
        }
      })

    result.flatMap(tl => tl.zuege)
      .flatMap(zug => zug.tractions)
      .forEach(traktion => {
        traktion.zugNummer = <string>zugNummerById.get(traktion.id);
      });
    return result;
  }

  public mapTraktionen(zug: any): Traktion[] {
    let result: Traktion[] = [];
    if (this.ensureCollection(zug.P).length > 1) {
      let passage = zug.P[0];
      if (passage) {
        this.ensureCollection(passage.TR)
          .filter((tr: any) => tr['@_z_id'] !== '-1')
          .forEach((tr: any) => {
            result.push(new Traktion(tr['@_z_id']));
          });
      }
    }
    return result;
  }

  public mapAudioMeldungVarianten(parsedXML: any): Map<string, MeldungVariante> {
    let result = new Map<string, MeldungVariante>();
    let meldungen = this.ensureCollection(parsedXML.KISDZStammdaten.VariantenPool.AudioVariantenListe.AV);
    meldungen.forEach((meldung: any) => {
      let meldungVariante = new MeldungVariante(VariantenType.AudioMeldung, meldung['@_fo'], meldung['@_dn'], '', this.data.spracheById.get(meldung['@_sp_id']));
      result.set(meldung['@_id'], meldungVariante);
    })
    return result;
  }

  public mapBildMeldungVarianten(parsedXML: any): Map<string, MeldungVariante> {
    let result = new Map<string, MeldungVariante>();
    let meldungen = this.ensureCollection(parsedXML.KISDZStammdaten.VariantenPool.BildVariantenListe.BV);
    meldungen.forEach((meldung: any) => {
      result.set(meldung['@_id'], new MeldungVariante(VariantenType.BildMeldung, meldung['@_fo'], meldung['@_dn'], ''));
    })
    return result;
  }

  public mapTextMeldungVarianten(parsedXML: any): Map<string, MeldungVariante> {
    let result = new Map<string, MeldungVariante>();
    let meldungen = this.ensureCollection(parsedXML.KISDZStammdaten.VariantenPool.TextVariantenListe.TV);
    meldungen.forEach((meldung: any) => {
      result.set(meldung['@_id'], new MeldungVariante(VariantenType.TextMeldung, '', '', meldung['@_tx']));
    })
    return result;
  }

  public mapPassages(zugJSON: any): Passage[] {
    let passages = this.ensureCollection(zugJSON.P);
    let result: Passage[] = [];
    passages.forEach((passage: any) => {
      if (passage) {
        // @ts-ignore
        let betriebspunkt: Betriebspunkt = this.data.betriebspunkById.get(passage['@_bp_id']);
        if (typeof betriebspunkt === 'undefined') {
          console.error('Could not find Betriebspunkt witd id: ', passage['@_bp_id']);
          betriebspunkt = new Betriebspunkt('Not existing Betriebspunkt', "NONE")
        }
        // @ts-ignore
        let streckenabschnitt: StreckenAbschnitt = this.data.streckenabschnitteById.get(passage['@_s_id']);
        let trigger = this.mapTrigger(passage);
        result.push(new Passage(betriebspunkt, trigger, passage['@_nz'], passage['@_bz'], streckenabschnitt));
      }
    });
    return result
  }

  public mapFolgezugId(zugJSON: any): string {
    // default: -1
    let folgezugId = Zug.DEFAULT_NO_FOLGEZUG_ID;
    let passages = this.ensureCollection(zugJSON.P);
    passages.forEach((passage: any) => {
      if (passage.F && passage.F['@_z_id']) {
        folgezugId =  passage.F['@_z_id'];
      }
    });
    return folgezugId;
  }

  public mapTrigger(passageJSON: any): Trigger[] {
    let triggers = this.ensureCollection(passageJSON.T);
    let result: Trigger[] = [];
    triggers.forEach((trigger: any) => {
      let meldungen = this.ensureCollection(trigger.MR).map((mr: any) => <Meldung>this.data.meldungenById.get(mr['@_m_id']));
      if (trigger && trigger.TP) {
        result.push(new Trigger(trigger['@_kc'], trigger.TP['@_na'], trigger.TP['@_we'], meldungen));
      } else if (trigger) {
        result.push(new Trigger(trigger['@_kc'], '', '', meldungen));
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
    return result.filter(XmlParser.notUndefined());
  }
}
