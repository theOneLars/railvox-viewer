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
import * as sax from "sax";
import {Stammdaten} from 'src/app/model/stammdaten';
import {Fahrplan} from 'src/app/model/fahrplan';

export class XmlParser {

  insideMeldungListe = false;
  insideTagesleistung = false;
  buffer = '';
  // tagesleistungen: string[] = []

  data: TimetableData = new TimetableData();

  public parseExport(xml: string): TimetableData {

    let strict = true // set to false for html-mode
    var parser = sax.parser(strict)

    parser.onopentag = (node) => {

      if (this.insideMeldungListe || this.insideTagesleistung) {
        this.appendOpeningNodeToBuffer(node)
      } else {
        switch (node.name) {
          case 'TL':
            this.mapTagesLeistungenNode(node)
            break
          case 'MeldungListe':
            this.mapMeldungListeNode(node)
            break
          case 'BV':
            this.mapBildMeldungVariantenNode(node)
            break
          case 'AV':
            this.mapAudioVarianteNode(node)
            break
          case 'TV':
            this.mapTextMeldungVarianteNode(node)
            break
          case 'BP':
            this.mapBetriebspunktNode(node)
            break
          case 'SA':
            this.mapStreckenabschnittNode(node)
            break
          case 'Sprache':
            this.mapSprachNode(node)
            break;
          case 'Fahrplan':
            this.mapFahrplanNode(node)
            break
          case 'VP':
            this.mapVerkehrsperiodeNode(node)
            break
          case 'KISDZStammdaten':
            this.mapKISDZStammdatenNode(node)
            break
          default:
        }
      }
    }

    parser.onclosetag = (node: any) => {

      if (typeof node === 'undefined') {
        // do nothing
      } else if (this.insideMeldungListe || this.insideTagesleistung) {
        this.appendClosingNodeToBuffer(node)
      }

      switch (node){
        case 'MeldungListe':
          this.insideMeldungListe = false
          let parsedMeldungen = this.parseXml(this.buffer)
          this.buffer = ''
          // todo: change pattern of assignment inside the handling method
          this.data.meldungenById = this.mapMeldungen(parsedMeldungen)
          break
        case 'TL':
          this.data.tagesLeistungen.push(this.mapTagesleistungNode(this.parseXml(this.buffer)))
          this.insideTagesleistung = false
          this.buffer = ''
      }
    }

    parser.write(xml).close()
    this.postProcessTagesleistungen()
    this.data.title = this.createTitle();
    return this.data;
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

  private createTitle(): string {
    let verkehrsperiode: Verkehrsperiode = <Verkehrsperiode>this.data.verkehrsperiodeById.get([...this.data.verkehrsperiodeById.keys()][0]);
    let title =  this.data.stammdaten.fahrplanversion + ' - ' + this.data.stammdaten.zielsystem;
    if (verkehrsperiode) {
      title += ' (' + verkehrsperiode.fromDate.format("DD.MM.YYYY") + ' - ' + verkehrsperiode.toDate.format("DD.MM.YYYY") + ')';
    }
    return title
  }

  public mapVerkehrsperiodeNode(node: any) {
    let validFrom = this.data.fahrplan.gueltigAb;
    let validTo = this.data.fahrplan.gueltigBis
    this.data.verkehrsperiodeById.set(
      node.attributes['id'],
      new Verkehrsperiode(node.attributes['id'], node.attributes['co'], validFrom, validTo, node.attributes['fm'])
    )
  }

  public mapSprachNode(node: any) {
    this.data.spracheById.set(node.attributes.id, new Sprache(node.attributes.co, node.attributes.be))
  }

  mapMeldungen(parsedXML: any): Map<string, Meldung> {
    let meldungen: any = this.ensureCollection(parsedXML.MeldungListe.M);
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

  public mapBetriebspunktNode(node: any) {
    this.data.betriebspunkById.set(node.attributes.id, new Betriebspunkt(node.attributes.name, node.attributes.ak))
  }

  public mapTagesleistungNode(parsedXML: any) {
      let zuege = this.ensureCollection(parsedXML.TL.Z);
      let trains: Zug[] = [];
      zuege.forEach((zug: any) => {
        trains.push(new Zug(zug['@_dk'], zug['@_id'], zug['@_vp_id'], zug['@_zn'],
          this.mapPassages(zug), this.mapTraktionen(zug), <Verkehrsperiode>this.data.verkehrsperiodeById.get(zug['@_vp_id']), this.mapFolgezugId(zug)));
      });
      return new Tagesleistung(trains, parsedXML.TL['@_nr']);
  }

  public postProcessTagesleistungen() {
    let zugNummerById = new Map<string, string>();
    this.data.tagesLeistungen
      .flatMap(it => it.zuege)
      .forEach(zug => zugNummerById.set(zug.id, zug.zugnummer))

    this.data.tagesLeistungen.flatMap(tl => tl.zuege)
      .forEach(zug => {
        if (zug.hasFolgezug()) {
          zug.folgezugNumber = <string>zugNummerById.get(zug.folgezugId);
        }
      })

    this.data.tagesLeistungen.flatMap(tl => tl.zuege)
      .flatMap(zug => zug.tractions)
      .forEach(traktion => {
        traktion.zugNummer = <string>zugNummerById.get(traktion.id);
      });
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
        folgezugId = passage.F['@_z_id'];
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

  private mapKISDZStammdatenNode(node: any) {
    this.data.stammdaten = new Stammdaten(
      node.attributes['formatversion'],
      node.attributes['erzeugt_von'],
      node.attributes['erzeugt_am'],
      node.attributes['zielsystem'],
      node.attributes['fahrplanversion']
    )
  }

  private mapFahrplanNode(node: any) {
    this.data.fahrplan = new Fahrplan(node.attributes['gueltig_ab'], node.attributes['gueltig_bis'])
  }

  private mapAudioVarianteNode(node: any) {
    let meldungVariante = new MeldungVariante(
      VariantenType.AudioMeldung,
      node.attributes['fo'],
      node.attributes['dn'],
      '',
      // Achtung: Reihenfolge ist wichtig, ggf. entkoppeln
      this.data.spracheById.get(node.attributes['sp_id'])
    );
    this.data.meldungVarianteById.set(node.attributes['id'], meldungVariante)
  }

  private mapTextMeldungVarianteNode(node: any) {

    let meldungVariante = new MeldungVariante(
      VariantenType.TextMeldung,
      '',
      '',
      node.attributes['tx']
    )
    this.data.meldungVarianteById.set(node.attributes['id'], meldungVariante)
  }

  private mapBildMeldungVariantenNode(node: any) {
    let meldungVariante = new MeldungVariante(
      VariantenType.BildMeldung,
      node.attributes['fo'],
      node.attributes['dn'],
      '')

    this.data.meldungVarianteById.set(node.attributes['id'], meldungVariante)
  }

  private mapMeldungListeNode(node: any) {
    this.insideMeldungListe = true
    this.buffer = ''
    this.appendOpeningNodeToBuffer(node)
    if (node.isSelfClosing) {
      this.insideMeldungListe = false
    }
  }

  private appendOpeningNodeToBuffer(node: any) {
    let tag = `<${node.name}`;
    for (const attr in node.attributes) {
      tag += ` ${attr}="${node.attributes[attr]}"`;
    }
    tag += '>';
    this.buffer += tag
  }

  private appendClosingNodeToBuffer(node: any) {
    this.buffer += `</${node}>`
  }

  private mapStreckenabschnittNode(node: any) {
    // todo: es gibt noch mehr Informationen auf den Streckenabschnitten, die gemapped werden könnten
    this.data.streckenabschnitteById.set(node.attributes['id'], new StreckenAbschnitt(node.attributes['di']))
  }

  private mapTagesLeistungenNode(node: any) {
    this.insideTagesleistung = true
    this.buffer = ''
    this.appendOpeningNodeToBuffer(node)
    if (node.isSelfClosing) {
      this.insideMeldungListe = false
    }
  }
}
