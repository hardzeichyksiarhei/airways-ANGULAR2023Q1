import { createReducer, on } from '@ngrx/store'
import {
  changeEndDate,
  changeSearchType,
  changeStartDate,
} from './search.actions'
import { IAirport } from '../airports/airports.model'

export type SearchType = 'ROUND_TRIP' | 'ONE_WAY'

export interface SearchState {
  type: SearchType

  route: {
    from: IAirport | null
    to: IAirport | null
  }

  dates: {
    start: Date
    end?: Date | null
  }

  passengers: {
    adults: number
    child: number
    infant: number
  }
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
  )
)
