import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlightSearchComponent } from './pages/flight-search/flight-search.component'
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component'
import { BookingProcessComponent } from './pages/booking-process/booking-process.component'
import { SummaryComponent } from './pages/summary/summary.component'
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component'

@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightSelectionComponent,
    BookingProcessComponent,
    SummaryComponent,
    ShoppingCartComponent,
  ],
  imports: [CommonModule],
})
export class AirwaysModule {}
