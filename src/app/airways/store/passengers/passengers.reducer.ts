import { createReducer, on } from '@ngrx/store'
import {
  addPassenger,
  changeContacts,
  changeContactsValid,
  changePassengersListValid,
  createPassengersList,
} from './passengers.actions'

export interface PassengerCard {
  dateOfBirth: string
  firstName: string
  gender: string
  index: number
  lastName: string
  passengerType: string
  specialAssistance: boolean
  valid: boolean
}

export interface PassengersState {
  passengersList: PassengerCard[]
  passengersListValid: boolean
  contacts: {
    countryCode: string
    phone: string
    email: string
  }
  contactsValid: boolean
}

const initialState: PassengersState = {
  passengersList: [],
  passengersListValid: false,
  contacts: {
    countryCode: '',
    email: '',
    phone: '',
  },
  contactsValid: false,
}

export const passengersReducer = createReducer(
  initialState,
  on(createPassengersList, (state, action) => ({
    ...state,
    passengersList: action.list as unknown as PassengerCard[],
  })),
  on(addPassenger, (state, action) => ({
    ...state,
    passengersList: state.passengersList.map((el) => {
      return el.index === action.index
        ? ({ ...el, ...action.value, valid: action.valid } as PassengerCard)
        : el
    }),
  })),
  on(changePassengersListValid, (state, action) => ({
    ...state,
    passengersListValid: action.valid,
  })),
  on(changeContactsValid, (state, action) => ({
    ...state,
    contactsValid: action.valid,
  })),
  on(changeContacts, (state, action) => {
    return {
      ...state,
      contacts: {
        countryCode: action.countryCode,
        phone: action.phone,
        email: action.email,
      },
    }
  })
)
