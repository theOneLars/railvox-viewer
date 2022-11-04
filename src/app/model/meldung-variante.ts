export class MeldungVariante {

  type: string;
  format: string;
  filename: string;
  text: string;

  constructor(type: string, format: string, filename: string, text: string) {
    this.type = type;
    this.format = format;
    this.filename = filename;
    this.text = text;
  }
}
