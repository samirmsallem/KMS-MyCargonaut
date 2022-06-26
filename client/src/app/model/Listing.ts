export class Listing {
  _id: string
  email: string
  zeit: Date
  kosten: number
  sitzplaetze: number
  frachtplatz: number
  startort: string
  ziel: string

  constructor(_id: string,email: string, zeit: Date, kosten: number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string) {
    this._id = _id;
    this.email = email;
    this.zeit = zeit;
    this.kosten = kosten;
    this.sitzplaetze = sitzplaetze;
    this.frachtplatz = frachtplatz;
    this.startort = startort;
    this.ziel = ziel;
  }
}
