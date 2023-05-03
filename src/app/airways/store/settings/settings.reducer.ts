import { createReducer, on } from '@ngrx/store'
import { changeCurrency, changeDate } from './settings.actions'

export interface SettingsState {
  date: string
  dates: string[]

  currency: string
  currencies: string[]
}

const initialState: SettingsState = {
  date: 'MM/DD/YYYY',
  dates: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'],

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
  ),
  on(
    changeDate,
    (state, action): SettingsState => ({
      ...state,
      date: action.date,
    })
  )
)
