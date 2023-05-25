import { createReducer, on } from '@ngrx/store'
import * as dayjs from 'dayjs'

import {
  changeFromCurrentSlot,
  changeFromSlots,
  changeToCurrentSlot,
  changeToSlots,
  searchFlights,
  searchFlightsSuccess,
} from './flights.actions'
import { IFlight } from './flights.model'

export interface ISlot {
  date: dayjs.Dayjs
  formatDate: string
  dayOfWeek: string
  disabled: boolean
  flight: Omit<IFlight, 'otherFlights'> | null
}

export interface FlightsState {
  flights: IFlight[]
  loading: boolean

  fromCurrentSlot: ISlot | null
  toCurrentSlot: ISlot | null

  fromSlots: ISlot[]
  toSlots: ISlot[]
}

export const getCurrentSlot = (
  flight: Omit<IFlight, 'otherFlights'>,
  disabled = false
) => {
  const date = dayjs(flight.takeoffDate)

  return {
    date,
    formatDate: date.format('DD ddd'),
    dayOfWeek: date.format('dddd'),
    disabled,
    flight,
  }
}

export const getSlots = (
  flights: Record<number, IFlight>,
  currentSlot: ISlot
) => {
  const key = Object.keys(flights)

  const beforeSlots = [...new Array(5)].map((_, i) => {
    const date = currentSlot.date.subtract(i + 1, 'day')

    return {
      date,
      formatDate: date?.format('DD ddd'),
      dayOfWeek: date?.format('dddd'),
      disabled: !key.includes(`${i - 5}`),
      flight: flights[`${i - 5}`] || null,
    }
  })

  const afterSlots = [...new Array(5)].map((_, i) => {
    const date = currentSlot.date.add(i + 1, 'day')

    return {
      date,
      formatDate: date?.format('DD ddd'),
      dayOfWeek: date?.format('dddd'),
      disabled: !key.includes(`${i + 1}`),
      flight: flights[`${i + 1}`] || null,
    }
  })

  return [...beforeSlots.reverse(), currentSlot, ...afterSlots]
}

const initialState: FlightsState = {
  flights: [],
  loading: false,

  fromCurrentSlot: null,
  toCurrentSlot: null,

  fromSlots: [],
  toSlots: [],
}

export const flightsReducer = createReducer(
  initialState,
  on(searchFlights, (state): FlightsState => ({ ...state, loading: true })),
  on(searchFlightsSuccess, (state, action): FlightsState => {
    const [rowFromFlight, rowToFlight] = action.flights

    const { otherFlights: fromOtherFlights, ...fromFlight } = rowFromFlight

    const fromCurrentSlot = getCurrentSlot(fromFlight)

    let toCurrentSlot = null
    let toSlots = [] as ISlot[]
    if (rowToFlight) {
      const { otherFlights: toOtherFlights, ...toFlight } = rowToFlight

      toCurrentSlot = getCurrentSlot(toFlight)
      toSlots = getSlots(toOtherFlights, toCurrentSlot)
    }

    return {
      ...state,
      flights: action.flights,
      loading: false,
      fromCurrentSlot,
      toCurrentSlot,
      fromSlots: getSlots(fromOtherFlights, fromCurrentSlot),
      toSlots,
    }
  }),
  on(
    changeFromCurrentSlot,
    (state, action): FlightsState => ({
      ...state,
      fromCurrentSlot: action.slot,
    })
  ),
  on(
    changeToCurrentSlot,
    (state, action): FlightsState => ({
      ...state,
      toCurrentSlot: action.slot,
    })
  ),
  on(
    changeFromSlots,
    (state, action): FlightsState => ({
      ...state,
      fromSlots: action.slots,
    })
  ),
  on(
    changeToSlots,
    (state, action): FlightsState => ({
      ...state,
      toSlots: action.slots,
    })
  )
)
