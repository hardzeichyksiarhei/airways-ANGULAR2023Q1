import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { IFlight } from './flights.model'

import { environment } from '../../../environments'

const { apiURL } = environment

export interface ISearchFlightsArgs {
  body: {
    fromKey: string
    toKey: string
    forwardDate: string
    backDate?: string
  }
}

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private http: HttpClient) {}

  search(args: ISearchFlightsArgs) {
    return this.http.post(`${apiURL}/flights`, args.body) as Observable<
      IFlight[]
    >
  }
}
