import { IAirport } from '../../airways/store/airports/airports.model'

export interface IFlight {
  flightNumber: string
  form: IAirport
  landingDate: string
  otherFlights: Record<number, IFlight>
  price: Record<string, number>
  seats: { total: number; avaible: number }
  takeoffDate: string
  timeMins: number
  to: IAirport
  city: string
  country: string
  gmt: string
  key: string
  name: string
}
