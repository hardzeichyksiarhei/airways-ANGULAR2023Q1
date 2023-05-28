import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AirwayState } from '../types'

export const selectPassengersFeature =
  createFeatureSelector<AirwayState>('airway')

export const selectPassengersList = createSelector(
  selectPassengersFeature,
  (state) => {
    return state.passengers.passengersList
  }
)

export const selectAdultList = createSelector(
  selectPassengersList,
  (passengers) => {
    return passengers.filter((passenger) => passenger.passengerType === 'Adult')
  }
)

export const selectChildList = createSelector(
  selectPassengersList,
  (passengers) => {
    return passengers.filter((passenger) => passenger.passengerType === 'Child')
  }
)

export const selectInfantList = createSelector(
  selectPassengersList,
  (passengers) => {
    return passengers.filter(
      (passenger) => passenger.passengerType === 'Infant'
    )
  }
)

export const selectPassengersListValid = createSelector(
  selectPassengersFeature,
  (state) => state.passengers.passengersListValid
)

export const selectContacts = createSelector(
  selectPassengersFeature,
  (state) => state.passengers.contacts
)

export const selectContactsValid = createSelector(
  selectPassengersFeature,
  (state) => {
    return state.passengers.contactsValid
  }
)
