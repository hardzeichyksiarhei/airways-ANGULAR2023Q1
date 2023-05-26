import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AirwayState } from '../types'

export const selectAuthFeature = createFeatureSelector<AirwayState>('airway')

export const selectAuth = createSelector(
  selectAuthFeature,
  (state) => state.auth.token
)

export const selectAuthError = createSelector(
  selectAuthFeature,
  (state) => state.auth.error
)
