import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { ISlot } from '../../../flights/store/flights.reducer'
import { selectToCurrentSlot } from '../../../flights/store/flights.selectors'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(private store: Store) {}

  toCurrentSlot$: Observable<ISlot | null> =
    this.store.select(selectToCurrentSlot)
}
