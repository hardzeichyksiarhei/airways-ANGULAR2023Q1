import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { ISlot } from '../../../flights/store/flights.reducer'
import {
  selectFromCurrentSlot,
  selectToCurrentSlot,
} from '../../../flights/store/flights.selectors'
import { selectPassengersList } from '../../store/passengers/passengers.selectors'
import { PassengerCard } from '../../store/passengers/passengers.reducer'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(private store: Store) {}

  fromCurrentSlot$: Observable<ISlot | null> = this.store.select(
    selectFromCurrentSlot
  )

  toCurrentSlot$: Observable<ISlot | null> =
    this.store.select(selectToCurrentSlot)

  passengers$: Observable<PassengerCard[]> =
    this.store.select(selectPassengersList)
}
