import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import {
  selectCurrency,
  selectCurrencies,
} from '../../store/settings/settings.selectors'
import { changeCurrency } from '../../store/settings/settings.actions'

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
})
export class CurrencySelectorComponent {
  currency$: Observable<string> = this.store.select(selectCurrency)

  currencies$: Observable<string[]> = this.store.select(selectCurrencies)

  constructor(private store: Store) {}

  onChangeCurrency(currency: string) {
    this.store.dispatch(changeCurrency({ currency }))
  }
}
