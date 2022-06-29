export class Listing {
  _id: string
  ersteller: string
  bucher: string
  angenommen: boolean
  startort: string
  ziel: string
  zeit: Date
  kosten: number
  sitzplaetze: number
  frachtplatz: number
  commentar: string


  constructor(id: string, ersteller: string, bucher: string, angenommen: boolean, startort: string, ziel: string, zeit: Date, kosten: number, sitzplaetze: number, frachtplatz: number, commentar: string) {
    this._id = id;
    this.ersteller = ersteller;
    this.bucher = bucher;
    this.angenommen = angenommen;
    this.startort = startort;
    this.ziel = ziel;
    this.zeit = zeit;
    this.kosten = kosten;
    this.sitzplaetze = sitzplaetze;
    this.frachtplatz = frachtplatz;
    this.commentar = commentar;
  }
}
