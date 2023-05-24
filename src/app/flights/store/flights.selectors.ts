import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FlightsState } from './flights.reducer'

export const selectFlightsFeature =
  createFeatureSelector<FlightsState>('flights')

export const selectFlights = createSelector(
  selectFlightsFeature,
  (state) => state.flights
)

export const selectFromFlight = createSelector(selectFlights, (flights) => {
  return flights.length ? flights[0] : null
})

export const selectToFlight = createSelector(selectFlights, (flights) => {
  return flights.length ? flights[1] : null
})
