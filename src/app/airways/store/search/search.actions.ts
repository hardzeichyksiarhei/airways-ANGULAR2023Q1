import { createAction, props } from '@ngrx/store'

import { SearchType } from './search.reducer'
import { IAirport } from '../airports/airports.model'

export const changeSearchType = createAction(
  '[Airway Search] Change Search Type',
  props<{ searchType: SearchType }>()
)

export const changeStartDate = createAction(
  '[Airway Search] Change Start Date',
  props<{ startDate: Date }>()
)

export const changeEndDate = createAction(
  '[Airway Search] Change End Date',
  props<{ endDate: Date }>()
)

export const changeRouteFrom = createAction(
  '[Airway Search] Change Route From',
  props<{ from: IAirport }>()
)

export const changeRouteTo = createAction(
  '[Airway Search] Change Route To',
  props<{ to: IAirport }>()
)
