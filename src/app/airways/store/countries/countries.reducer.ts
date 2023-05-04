import { createReducer, on } from '@ngrx/store'

import { loadCountries, loadCountriesSuccess } from './countries.actions'

export interface CountriesState {
  countries: any[]
  loading: boolean
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
}

export const countriesReducer = createReducer(
  initialState,
  on(loadCountries, (state): CountriesState => ({ ...state, loading: true })),
  on(
    loadCountriesSuccess,
    (state, action): CountriesState => ({
      ...state,
      countries: action.countries,
      loading: false,
    })
  )
)
