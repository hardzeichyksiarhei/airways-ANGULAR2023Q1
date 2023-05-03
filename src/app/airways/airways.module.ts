import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { CoreModule } from '../core/core.module'

import { DefaultComponent } from './layouts/default/default.component'

import { HeaderComponent } from './components/header/header.component'

import { FlightSearchComponent } from './pages/flight-search/flight-search.component'
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component'
import { BookingProcessComponent } from './pages/booking-process/booking-process.component'
import { SummaryComponent } from './pages/summary/summary.component'
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component'

import { DateFormatSelectorComponent } from './components/date-format-selector/date-format-selector.component'
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component'
import { MaterialModule } from '../material.module'

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
  ],
  imports: [CommonModule, RouterModule, CoreModule, MaterialModule],
})
export class AirwaysModule {}
