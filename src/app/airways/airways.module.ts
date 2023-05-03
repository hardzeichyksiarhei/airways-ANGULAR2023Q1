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

@NgModule({
  declarations: [
    DefaultComponent,

    // Components
    HeaderComponent,

    // Pages
    FlightSearchComponent,
    FlightSelectionComponent,
    BookingProcessComponent,
    SummaryComponent,
    ShoppingCartComponent,
  ],
  imports: [CommonModule, CoreModule, RouterModule],
})
export class AirwaysModule {}
