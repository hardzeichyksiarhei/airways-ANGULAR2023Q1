import { createReducer, on } from '@ngrx/store'
import {
  changeEndDate,
  changeRouteFrom,
  changeRouteTo,
  changePassengers,
  changeSearchType,
  changeStartDate,
  changeSearch,
} from './search.actions'
import { IAirport } from '../airports/airports.model'

export type SearchType = 'ROUND_TRIP' | 'ONE_WAY'

export interface IPassengers {
  adults: number
  child: number
  infant: number
}

export interface SearchState {
  type: SearchType

  route: {
    from: IAirport | null
    to: IAirport | null
  }

  dates: {
    start: Date | null
    end?: Date | null
  }

  passengers: IPassengers
}

const initialState: SearchState = {
  type: 'ROUND_TRIP',

  route: {
    from: null,
    to: null,
  },

  dates: {
    start: new Date(),
    end: null,
  },

  passengers: {
    adults: 1,
    child: 0,
    infant: 0,
  },
}

export const searchReducer = createReducer(
  initialState,
  on(
    changeSearchType,
    (state, action): SearchState => ({
      ...state,
      type: action.searchType,
    })
  ),
  on(
    changeStartDate,
    (state, action): SearchState => ({
      ...state,
      dates: {
        ...state.dates,
        start: action.startDate,
      },
    })
  ),
  on(
    changeEndDate,
    (state, action): SearchState => ({
      ...state,
      dates: {
        ...state.dates,
        end: action.endDate,
      },
    })
  ),
  on(
    changeRouteFrom,
    (state, action): SearchState => ({
      ...state,
      route: {
        ...state.route,
        from: action.from,
      },
    })
  ),
  on(
    changeRouteTo,
    (state, action): SearchState => ({
      ...state,
      route: {
        ...state.route,
        to: action.to,
      },
    })
  ),
  on(
    changePassengers,
    (state, action): SearchState => ({
      ...state,
      passengers: {
        ...state.passengers,
        ...action,
      },
    })
  ),
  on(changeSearch, (state, action): SearchState => {
    return {
      ...state,
      ...action.search,
      route: {
        ...state.route,
        ...action.search.route,
      },
      dates: {
        ...state.dates,
        ...action.search.dates,
      },
      passengers: {
        ...state.passengers,
        ...action.search.passengers,
      },
    }
  })
)
