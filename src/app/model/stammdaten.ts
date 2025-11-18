export class Stammdaten {

  formatVersion: string;
  erzeugtVon: string;
  erzeugt_am: string;
  zielsystem: string
  fahrplanversion: string

  constructor(formatVersion: string, erzeugtVon: string, erzeugt_am: string, zielsystem: string, fahrplanversion: string) {
    this.formatVersion = formatVersion;
    this.erzeugtVon = erzeugtVon;
    this.erzeugt_am = erzeugt_am;
    this.zielsystem = zielsystem;
    this.fahrplanversion = fahrplanversion;
  }
}
