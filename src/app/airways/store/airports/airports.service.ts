import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { IAirport } from './airports.model'

import { environment } from '../../../../environments'

const { apiURL } = environment

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${apiURL}/airports`) as Observable<IAirport[]>
  }
}
