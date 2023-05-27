import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrency } from '../store/settings/settings.selectors'

@Pipe({
  name: 'currencyFormat',
  pure: false,
})
export class CurrencyFormatPipe implements PipeTransform {
  constructor(private store: Store, private _ref: ChangeDetectorRef) {}

  value?: string

  mark?: string

  transform(value?: Record<string, number>) {
    if (!this.value) {
      this.store.select(selectCurrency).subscribe((currency) => {
        if (currency === 'EUR') this.mark = '€'
        if (currency === 'USD') this.mark = '$'

        this.value = `${value ? value[currency.toLowerCase()].toFixed(2) : ''}`
        if (this.value && this.mark) this.value = `${this.mark} ${this.value}`

        this._ref.markForCheck()
      })
    }

    return this.value
  }
}
