import { Component, Input, OnInit } from '@angular/core'
import { PassengerCard } from '../../store/passengers/passengers.reducer'
import { Store } from '@ngrx/store'
import { selectCurrency } from '../../store/settings/settings.selectors'

@Component({
  selector: 'app-summary-price-card',
  templateUrl: './summary-price-card.component.html',
  styleUrls: ['./summary-price-card.component.scss'],
})
export class SummaryPriceCardComponent implements OnInit {
  constructor(private store: Store) {}

  @Input() prices?: Record<string, number>

  @Input() adults: PassengerCard[] | null = []

  @Input() childs: PassengerCard[] | null = []

  @Input() infants: PassengerCard[] | null = []

  currency = ''

  currencyKey = ''

  ngOnInit(): void {
    this.store.select(selectCurrency).subscribe((currency) => {
      if (currency === 'EUR') this.currency = '€'
      if (currency === 'USD') this.currency = '$'

      this.currencyKey = (currency || 'EUR').toLowerCase()
    })
  }

  get adultFarePrice() {
    if (!this.prices) return 0

    return this.prices[this.currencyKey] || 0
  }

  get adultTaxPrice() {
    return this.adultFarePrice * 0.3
  }

  get adultTotalPrice() {
    return (
      (this.adults || []).length * (this.adultFarePrice + this.adultTaxPrice)
    )
  }

  get childFarePrice() {
    if (!this.prices) return 0

    return (this.prices[this.currencyKey] || 0) * 0.9
  }

  get childTaxPrice() {
    return this.childFarePrice * 0.3
  }

  get childTotalPrice() {
    return (
      (this.childs || []).length * (this.childFarePrice + this.childTaxPrice)
    )
  }

  get infantFarePrice() {
    if (!this.prices) return 0

    return (this.prices[this.currencyKey] || 0) * 0.6
  }

  get infantTaxPrice() {
    return this.infantFarePrice * 0.3
  }

  get infantTotalPrice() {
    return (
      (this.childs || []).length * (this.infantFarePrice + this.infantTaxPrice)
    )
  }
}
