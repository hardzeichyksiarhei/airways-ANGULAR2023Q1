import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FlightsState } from './flights.reducer'

export const selectFlightsFeature =
  createFeatureSelector<FlightsState>('flights')

export const selectFlights = createSelector(
  selectFlightsFeature,
  (state) => state.flights
)

export const selectFromCurrentSlot = createSelector(
  selectFlightsFeature,
  (state) => state.fromCurrentSlot
)

export const selectToCurrentSlot = createSelector(
  selectFlightsFeature,
  (state) => state.toCurrentSlot
)

export const selectFromSlots = createSelector(
  selectFlightsFeature,
  (state) => state.fromSlots
)

export const selectToSlots = createSelector(
  selectFlightsFeature,
  (state) => state.toSlots
)

export const selectFromSlotSelected = createSelector(
  selectFlightsFeature,
  (state) => state.fromSlotSelected
)

export const selectToSlotSelected = createSelector(
  selectFlightsFeature,
  (state) => state.toSlotSelected
)
