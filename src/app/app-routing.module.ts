import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DefaultComponent } from './airways/layouts/default/default.component'

import { FlightSearchComponent } from './airways/pages/flight-search/flight-search.component'
import { FlightSelectionComponent } from './airways/pages/flight-selection/flight-selection.component'
import { BookingProcessComponent } from './airways/pages/booking-process/booking-process.component'
import { SummaryComponent } from './airways/pages/summary/summary.component'
import { ShoppingCartComponent } from './airways/pages/shopping-cart/shopping-cart.component'

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', component: FlightSearchComponent },
      { path: 'selection', component: FlightSelectionComponent },
      { path: 'booking', component: BookingProcessComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'cart', component: ShoppingCartComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
