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
