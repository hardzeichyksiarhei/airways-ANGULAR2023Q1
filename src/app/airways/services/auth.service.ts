import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from '../../../environments'

const { apiURL } = environment

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${apiURL}/auth/login`, {
      email,
      password,
    }) as Observable<any>
  }

  signup({
    countryCode,
    gender,
    citizenship,
    phone,
    firstName,
    lastName,
    dateOfBirth,
    password,
    email,
  }: SignUpDto) {
    return this.http.post(`${apiURL}/auth/registration`, {
      email,
      password,
      countryCode,
      gender,
      citizenship,
      phone,
      firstName,
      lastName,
      dateOfBirth,
    }) as Observable<any>
  }
}

interface SignUpDto {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  countryCode: string
  phone: string
  citizenship: string
}
