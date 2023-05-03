import { createAction, props } from '@ngrx/store'

export const changeCurrency = createAction(
  '[Airway Settings] Change currency',
  props<{ currency: string }>()
)
