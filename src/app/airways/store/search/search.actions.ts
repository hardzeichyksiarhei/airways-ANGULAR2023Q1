import { createAction, props } from '@ngrx/store'

import { SearchType } from './search.reducer'

export const changeSearchType = createAction(
  '[Airway Search] Change search type',
  props<{ searchType: SearchType }>()
)
