import { createAction, props } from '@ngrx/store'

export const loadCountries = createAction('[Airway Countries] Load Countries')

export const loadCountriesSuccess = createAction(
  '[Airway Countries] Load Countries Success',
  props<{ countries: any }>()
)
