import { Component, OnInit } from '@angular/core'
import { CardValue } from '../passenger-card/passenger-card.component'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  selectPassengers,
  selectTotalPassengers,
} from '../../store/search/search.selectors'
import { IPassengers } from '../../store/search/search.reducer'

@Component({
  selector: 'app-passengers-card-list',
  templateUrl: './passengers-card-list.component.html',
  styleUrls: ['./passengers-card-list.component.scss'],
})
export class PassengersCardListComponent implements OnInit {
  constructor(private store: Store) {}

  totalPassengers$: Observable<number> = this.store.select(
    selectTotalPassengers
  )

  passengers$: Observable<IPassengers> = this.store.select(selectPassengers)

  cardsList: Card[] = []

  onCardChange(e: CardValue) {
    this.cardsList = this.cardsList.map((el) => {
      return el.index === e.index ? { ...el, passengerInfo: e } : el
    })
    console.log(this.cardsList)
  }

  ngOnInit(): void {
    this.createCardsList()
  }

  createCardsList() {
    this.passengers$.subscribe((passengers) => {
      this.cardsList = []
      const adults =
        passengers.adults === 0
          ? []
          : new Array(passengers.adults).fill({
              passengerType: 'Adult',
              passengerInfo: {},
            })
      const child =
        passengers.child === 0
          ? []
          : new Array(passengers.adults).fill({
              passengerType: 'Child',
              passengerInfo: {},
            })
      const infant =
        passengers.infant === 0
          ? []
          : new Array(passengers.adults).fill({
              passengerType: 'Infant',
              passengerInfo: {},
            })

      this.cardsList = adults
        .concat(child)
        .concat(infant)
        .map((el, index) => {
          return { ...el, index: index + 1 }
        })

      //  check logic
    })
  }
}

interface Card {
  index: number
  passengerType: string
  passengerInfo: CardValue
}
