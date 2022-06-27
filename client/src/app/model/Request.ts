export class Request {
  _id: string
  zeit: Date
  sucher: string
  startort: string
  ziel: string
  kosten: number
  sitzplaetze: number
  frachtplatz: number
  bucher: string
  angenommen: boolean

  constructor(id: string, sucher: string, bucher: string, angenommen: boolean, startort: string, ziel: string, zeit: Date, kosten: number, sitzplaetze: number, frachtplatz: number) {
    this._id = id;
    this.sucher = sucher;
    this.bucher = bucher;
    this.angenommen = angenommen;
    this.startort = startort;
    this.ziel = ziel;
    this.zeit = zeit;
    this.kosten = kosten;
    this.sitzplaetze = sitzplaetze;
    this.frachtplatz = frachtplatz;
  }
}
