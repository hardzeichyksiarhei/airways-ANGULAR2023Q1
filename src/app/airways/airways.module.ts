import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { StoreModule, combineReducers } from '@ngrx/store'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { CoreModule } from '../core/core.module'
import { MaterialModule } from '../material.module'

import { DefaultComponent } from './layouts/default/default.component'

import { HeaderComponent } from './components/header/header.component'

import { FlightSearchComponent } from './pages/flight-search/flight-search.component'
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component'
import { BookingProcessComponent } from './pages/booking-process/booking-process.component'
import { SummaryComponent } from './pages/summary/summary.component'
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component'

import { DateFormatSelectorComponent } from './components/date-format-selector/date-format-selector.component'
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component'
import { FlightSearchFormComponent } from './components/flight-search-form/flight-search-form.component'

import { settingsReducer } from './store/settings/settings.reducer'
import { AirportsEffects } from './store/airports/airports.effects'
import { airportsReducer } from './store/airports/airports.reducer'

import { AirwayState } from './store/types'
import { searchReducer } from './store/search/search.reducer'

@NgModule({
  declarations: [
    DefaultComponent,

    // Components
    HeaderComponent,
    DateFormatSelectorComponent,
    CurrencySelectorComponent,

    // Pages
    FlightSearchComponent,
    FlightSelectionComponent,
    BookingProcessComponent,
    SummaryComponent,
    ShoppingCartComponent,
    FlightSearchFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature(
      'airway',
      combineReducers<AirwayState>({
        settings: settingsReducer,
        airports: airportsReducer,
        search: searchReducer,
      })
    ),
    EffectsModule.forFeature(AirportsEffects),
  ],
})
export class AirwaysModule {}
