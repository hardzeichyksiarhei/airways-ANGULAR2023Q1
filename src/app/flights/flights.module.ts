import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ActionReducer, StoreModule } from '@ngrx/store'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { CoreModule } from '../core/core.module'
import { MaterialModule } from '../material.module'
import { flightsReducer } from './store/flights.reducer'
import { FlightsEffects } from './store/flights.effects'
import { localStorageSync } from 'ngrx-store-localstorage'

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['flights', 'fromCurrentSlot', 'toCurrentSlot'],
    rehydrate: true,
  })(reducer)
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('flights', flightsReducer, {
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forFeature(FlightsEffects),
  ],
})
export class FlightsModule {}
