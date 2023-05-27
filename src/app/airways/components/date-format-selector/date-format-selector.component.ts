import { Component, Inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import {
  selectDate,
  selectDates,
} from '../../store/settings/settings.selectors'
import { changeDate } from '../../store/settings/settings.actions'
import { DateAdapter } from '@angular/material/core'
import { CustomDateAdapter } from '../../../material.module'

@Component({
  selector: 'app-date-format-selector',
  templateUrl: './date-format-selector.component.html',
  styleUrls: ['./date-format-selector.component.scss'],
})
export class DateFormatSelectorComponent {
  date$: Observable<string> = this.store.select(selectDate)

  dates$: Observable<string[]> = this.store.select(selectDates)

  constructor(
    private store: Store,
    @Inject(DateAdapter) private customDateAdapter: CustomDateAdapter
  ) {}

  onChangeDate(date: string) {
    this.customDateAdapter.formatto = date
    this.store.dispatch(changeDate({ date }))
  }
}
