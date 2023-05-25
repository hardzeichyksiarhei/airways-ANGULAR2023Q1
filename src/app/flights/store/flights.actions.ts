import { createAction, props } from '@ngrx/store'

import { IFlight } from './flights.model'
import { ISearchFlightsArgs } from './flights.service'
import { ISlot } from './flights.reducer'

export const searchFlights = createAction(
  '[Airway Flights] Search Flights',
  props<{ args: ISearchFlightsArgs }>()
)

export const searchFlightsSuccess = createAction(
  '[Airway Flights] Search Flights Success',
  props<{ flights: IFlight[] }>()
)

export const changeFromCurrentSlot = createAction(
  '[Airway Flights] Change From Current Slot',
  props<{ slot: ISlot }>()
)

export const changeToCurrentSlot = createAction(
  '[Airway Flights] Change To Current Slot',
  props<{ slot: ISlot }>()
)

export const changeFromSlots = createAction(
  '[Airway Flights] Change From Slots',
  props<{ slots: ISlot[] }>()
)

export const changeToSlots = createAction(
  '[Airway Flights] Change To Slots',
  props<{ slots: ISlot[] }>()
)
