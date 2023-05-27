import { createReducer, on } from '@ngrx/store'
import { Card } from '../../components/passengers-card-list/passengers-card-list.component'
import {
  addPassenger,
  changeContacts,
  changeContactsValid,
  changePassengersListValid,
  createPassengersList,
} from './passengers.actions'
import { CardValue } from '../../components/passenger-card/passenger-card.component'

export interface PassengersState {
  passengersList: CardValue[]
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
    passengersList: action.list,
  })),
  on(addPassenger, (state, action) => ({
    ...state,
    passengersList: state.passengersList.map((el) => {
      return el.index === action.index
        ? { ...el, ...action.value, valid: action.valid }
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
