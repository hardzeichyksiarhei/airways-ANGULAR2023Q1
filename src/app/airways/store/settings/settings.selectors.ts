import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AirwayState } from '../types'

export const selectSettingsFeature =
  createFeatureSelector<AirwayState>('airway')

export const selectCurrency = createSelector(
  selectSettingsFeature,
  (state) => state.settings.currency
)

export const selectCurrencies = createSelector(
  selectSettingsFeature,
  (state) => state.settings.currencies
)

export const selectDate = createSelector(
  selectSettingsFeature,
  (state) => state.settings.date
)

export const selectDates = createSelector(
  selectSettingsFeature,
  (state) => state.settings.dates
)

export const selectStep = createSelector(
  selectSettingsFeature,
  (state) => state.settings.step
)

export const selectSteps = createSelector(
  selectSettingsFeature,
  (state) => state.settings.steps
)
