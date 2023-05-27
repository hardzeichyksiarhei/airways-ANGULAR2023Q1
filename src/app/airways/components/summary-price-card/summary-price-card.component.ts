import { Component, Input } from '@angular/core'
import { PassengerCard } from '../../store/passengers/passengers.reducer'

@Component({
  selector: 'app-summary-price-card',
  templateUrl: './summary-price-card.component.html',
  styleUrls: ['./summary-price-card.component.scss'],
})
export class SummaryPriceCardComponent {
  @Input() adults: PassengerCard[] | null = []

  @Input() childs: PassengerCard[] | null = []

  @Input() infants: PassengerCard[] | null = []
}
