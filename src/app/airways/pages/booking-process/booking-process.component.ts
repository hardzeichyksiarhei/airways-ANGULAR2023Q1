import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Router } from '@angular/router'
import { selectSearchFeature } from '../../store/search/search.selectors'
import { take } from 'rxjs'
import { CardValue } from '../../components/passenger-card/passenger-card.component'

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.scss'],
})
export class BookingProcessComponent {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onCardChange(e: CardValue) {
    console.log(e)
  }

  clickToContinue() {
    this.router.navigate(['summary'], {})
  }

  clickToBack() {
    this.store
      .select(selectSearchFeature)
      .pipe(take(1))
      .subscribe(({ search }) => {
        this.router.navigate(['selection'], {
          queryParams: {
            fromKey: search.route.from?.key,
            toKey: search.route.to?.key,
            forwardDate: search.dates.start?.toISOString(),
            backDate: search.dates.end?.toISOString(),
          },
        })
      })
  }
}
