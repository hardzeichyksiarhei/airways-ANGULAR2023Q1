import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { CoreModule } from '../core/core.module'
import { MaterialModule } from '../material.module'
import { flightsReducer } from './store/flights.reducer'
import { FlightsEffects } from './store/flights.effects'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('flights', flightsReducer),
    EffectsModule.forFeature(FlightsEffects),
  ],
})
export class AirwaysModule {}
