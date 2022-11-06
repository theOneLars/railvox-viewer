export class Traktion {

  zugNummer: string;
  id: string;

  constructor(id: string, zugNummer?: string) {
    this.id = id;
    if (zugNummer) {
      this.zugNummer = zugNummer;
    }
  }
}
