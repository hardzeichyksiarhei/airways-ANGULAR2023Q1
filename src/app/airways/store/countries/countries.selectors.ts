import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AirwayState } from '../types'

export const selectCountriesFeature =
  createFeatureSelector<AirwayState>('airway')

export const selectCountries = createSelector(
  selectCountriesFeature,
  (state) => state.countries.countries
)
