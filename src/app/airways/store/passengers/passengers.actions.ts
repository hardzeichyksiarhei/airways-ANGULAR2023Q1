import { createAction, props } from '@ngrx/store'
import { CardValue } from '../../components/passenger-card/passenger-card.component'

export const createPassengersList = createAction(
  '[Airway Passenger] Create Passengers List',
  props<{ list: CardValue[] }>()
)

export const addPassenger = createAction(
  '[Airway Passenger] Add passenger',
  props<CardValue>()
)

export const changePassengersListValid = createAction(
  '[Airway Passenger] changePassengersListValid',
  props<{ valid: boolean }>()
)

export const changeContactsValid = createAction(
  '[Airway Passenger] changeContactsValid',
  props<{ valid: boolean }>()
)

export const changeContacts = createAction(
  '[Airway Passenger] changeContacts',
  props<{ email: string; phone: string; countryCode: string }>()
)

export const clearPassengers = createAction(
  '[Airway Passenger] clearPassengers'
)
