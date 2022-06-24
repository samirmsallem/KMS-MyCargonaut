export class Listing {
  email: string
  zeit: Date
  kosten: number
  sitzplaetze: number
  frachtplatz: number
  startort: string
  ziel: string

  constructor(email: string, zeit: Date, kosten: number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string) {
    this.email = email;
    this.zeit = zeit;
    this.kosten = kosten;
    this.sitzplaetze = sitzplaetze;
    this.frachtplatz = frachtplatz;
    this.startort = startort;
    this.ziel = ziel;
  }
}
