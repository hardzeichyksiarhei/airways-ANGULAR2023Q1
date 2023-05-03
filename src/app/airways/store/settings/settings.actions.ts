import { createAction, props } from '@ngrx/store'

export const changeCurrency = createAction(
  '[Airway Settings] Change currency',
  props<{ currency: string }>()
)

export const changeDate = createAction(
  '[Airway Settings] Change date',
  props<{ date: string }>()
)
