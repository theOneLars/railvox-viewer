import {Component, Input, OnInit} from '@angular/core';
import {TimetableData} from 'src/app/business/timetable-data';
import {DateFormatter} from 'src/app/util/date-formatter';

@Component({
  selector: 'app-file-details-tab',
  templateUrl: './file-details-tab.component.html',
  styleUrls: ['./file-details-tab.component.css']
})
export class FileDetailsTabComponent implements OnInit{

  @Input()
  timetableData: TimetableData;

  dataSource: TableEntry[] = [];
  displayedColumns: string[] = ['key', 'value'];

  ngOnInit(): void {
    this.dataSource = [
      this.createEntry('Gültigkeit', this.formatDate(this.timetableData.fahrplan.gueltigAb) + ' - '
        + this.formatDate(this.timetableData.fahrplan.gueltigBis)),
      this.createEntry('Verkehrsperioden', this.timetableData.verkehrsperiodeById.size),
      this.createEntry('Tagesleistungen', this.timetableData.tagesLeistungen.length),
      this.createEntry('Betriebspunkte', this.timetableData.betriebspunkById.size),
      this.createEntry('Streckenabschnitte', this.timetableData.streckenabschnitteById.size),
      this.createEntry('Meldungsvarianten', this.timetableData.meldungVarianteById.size),
      this.createEntry('Meldungen', this.timetableData.meldungenById.size),
      this.createEntry('Sprachen', this.timetableData.spracheById.size),
      this.createEntry('Generiert am', this.formatDate(this.timetableData.stammdaten.erzeugt_am)),
      this.createEntry('Generiert von', this.timetableData.stammdaten.erzeugtVon),
      this.createEntry('Fahrplanversion', this.timetableData.stammdaten.fahrplanversion),
      this.createEntry('Zielsystem', this.timetableData.stammdaten.zielsystem),
    ]
  }

  createEntry(key: string, value: string | number): TableEntry {
  return new TableEntry(key, value)
  }

  formatDate(date: string): string {
    return DateFormatter.convertToDate(date).format("DD.MM.YYYY")
  }




}

export class TableEntry {

  key: string;
  value: string | number

  constructor(key: string, value: string | number) {
    this.key = key;
    this.value = value;
  }
}
