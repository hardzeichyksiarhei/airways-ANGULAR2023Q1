import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ActionReducer, StoreModule, combineReducers } from '@ngrx/store'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { localStorageSync } from 'ngrx-store-localstorage'
import { SlickCarouselModule } from 'ngx-slick-carousel'

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
import { FlightSelectorComponent } from './components/flight-selector/flight-selector.component'
import { ChangePassengersCountItemComponent } from './components/change-passengers-count-item/change-passengers-count-item.component'
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { SignupFormComponent } from './components/signup-form/signup-form.component'
import { FlightEditSearchFormComponent } from './components/flight-edit-search-form/flight-edit-search-form.component'
import { authReducer } from './store/auth/auth.reducer'
import { AuthEffects } from './store/auth/auth.effects'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { PassengerInfoFormComponent } from './components/passenger-info-form/passenger-info-form.component'
import { ContactsFormComponent } from './components/contacts-form/contacts-form.component'
import { PassengerCardComponent } from './components/passenger-card/passenger-card.component'
import { PassengersCardListComponent } from './components/passengers-card-list/passengers-card-list.component'
import { passengersReducer } from './store/passengers/passengers.reducer'
import { CurrencyFormatPipe } from './pipes/currency-format.pipe'

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['search'], rehydrate: true })(reducer)
}

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
    FlightSelectorComponent,
    ChangePassengersCountItemComponent,
    AuthDialogComponent,
    LoginFormComponent,
    SignupFormComponent,
    FlightEditSearchFormComponent,
    PassengerInfoFormComponent,
    ContactsFormComponent,
    PassengerCardComponent,
    PassengersCardListComponent,
    CurrencyFormatPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,

    StoreModule.forFeature(
      'airway',
      combineReducers<AirwayState>({
        settings: settingsReducer,
        airports: airportsReducer,
        search: searchReducer,
        auth: authReducer,
        passengers: passengersReducer,
      }),
      { metaReducers: [localStorageSyncReducer] }
    ),
    EffectsModule.forFeature(AirportsEffects, AuthEffects),
    MatSlideToggleModule,
    MatTooltipModule,
    MatButtonToggleModule,
  ],
})
export class AirwaysModule {}
