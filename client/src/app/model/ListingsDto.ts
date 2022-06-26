export class ListingsDto {

  startort: string
  ziel: string
  zeit: string
  frachtplatz: number
  sitzplaetze: number
  kosten: number

  constructor(startort: string, ziel: string, zeit: string, frachtplatz: number, sitzplaetze: number, kosten: number) {
    this.startort = startort;
    this.ziel = ziel;
    this.zeit = zeit;
    this.frachtplatz = frachtplatz;
    this.sitzplaetze = sitzplaetze;
    this.kosten = kosten;
  }
}
