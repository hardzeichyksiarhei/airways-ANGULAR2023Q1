import { createAction, props } from '@ngrx/store'

import { SearchType } from './search.reducer'

export const changeSearchType = createAction(
  '[Airway Search] Change search type',
  props<{ searchType: SearchType }>()
)

export const changeStartDate = createAction(
  '[Airway Search] Change start date',
  props<{ startDate: Date }>()
)

export const changeEndDate = createAction(
  '[Airway Search] Change end date',
  props<{ endDate: Date }>()
)
