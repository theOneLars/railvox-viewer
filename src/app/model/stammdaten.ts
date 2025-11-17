export class Stammdaten {

  formatVersion: string;
  erzeugtVon: string;
  erzeugt_am: string;
  zielsystem: string
  fahrplanversion: String

  constructor(formatVersion: string, erzeugtVon: string, erzeugt_am: string, zielsystem: string, fahrplanversion: String) {
    this.formatVersion = formatVersion;
    this.erzeugtVon = erzeugtVon;
    this.erzeugt_am = erzeugt_am;
    this.zielsystem = zielsystem;
    this.fahrplanversion = fahrplanversion;
  }
}
