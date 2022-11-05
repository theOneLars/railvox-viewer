import {Sprache} from "../../model/sprache";

export class SprachProvider {

  public static german(): Sprache {
    return new Sprache('de', 'deutsch');
  }

  public static english(): Sprache {
    return new Sprache('en', 'english');
  }

}
