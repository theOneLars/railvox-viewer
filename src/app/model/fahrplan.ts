export class Fahrplan {
  gueltigAb: string;
  gueltigBis: string;

  constructor(gueltigAb: string, gueltigBis: string) {
    this.gueltigAb = gueltigAb;
    this.gueltigBis = gueltigBis;
  }
}
