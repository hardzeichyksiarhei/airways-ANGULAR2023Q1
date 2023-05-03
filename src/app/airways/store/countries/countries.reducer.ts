import { createReducer } from '@ngrx/store'

export interface CountriesState {
  countries: any[]
  loading: boolean
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
}

export const settingsReducer = createReducer(initialState)
