import { createReducer, on } from '@ngrx/store'
import {
  changeCurrency,
  changeDate,
  changeStep,
  updateSteps,
} from './settings.actions'

export interface IStep {
  key: string
  title: string
  editable: boolean
  saved: boolean
}

export interface SettingsState {
  date: string
  dates: string[]

  currency: string
  currencies: string[]

  step: IStep | null
  steps: IStep[]
}

const initialState: SettingsState = {
  date: 'MM/DD/YYYY',
  dates: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'],

  currency: 'EUR',
  currencies: ['EUR', 'USD'],

  step: null,
  steps: [
    {
      key: 'selection',
      title: 'Flights',
      editable: false,
      saved: false,
    },
    {
      key: 'booking',
      title: 'Passengers',
      editable: false,
      saved: false,
    },
    {
      key: 'summary',
      title: 'Review & Payment',
      editable: false,
      saved: false,
    },
  ],
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
  ),
  on(
    changeStep,
    (state, action): SettingsState => ({
      ...state,
      step: action.step,
    })
  ),
  on(updateSteps, (state, action): SettingsState => {
    const steps = state.steps.map((step) => {
      const slotFinded = action.steps.find(({ key }) => key === step.key)

      if (!slotFinded) return step

      return { ...step, ...slotFinded }
    })

    return { ...state, steps }
  })
)
