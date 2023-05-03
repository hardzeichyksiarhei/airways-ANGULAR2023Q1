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
