import { createReducer, on } from '@ngrx/store'
import { changeCurrency } from './settings.actions'

export interface SettingsState {
  date: string
  dates: string[]

  currency: string
  currencies: string[]
}

const initialState: SettingsState = {
  date: '',
  dates: [],

  currency: 'EUR',
  currencies: ['EUR', 'USD'],
}

export const settingsReducer = createReducer(
  initialState,
  on(
    changeCurrency,
    (state, action): SettingsState => ({
      ...state,
      currency: action.currency,
    })
  )
)
