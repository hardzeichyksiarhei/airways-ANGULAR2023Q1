import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'

import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component'
import { Observable } from 'rxjs'
import { selectAuth } from '../../store/auth/auth.selectors'
import { clearAuthError, logout } from '../../store/auth/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  isAuth$: Observable<string | null> = this.store.select(selectAuth)

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.store.dispatch(clearAuthError())
    this.dialog.open(AuthDialogComponent, {
      width: '514px',
      ariaModal: true,
      enterAnimationDuration,
      exitAnimationDuration,
    })
    this.checkAuthAndCloseDialog()
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  checkAuthAndCloseDialog() {
    this.isAuth$.subscribe((value) => {
      if (value) {
        this.closeDialog()
      }
    })
  }

  onLogout() {
    this.store.dispatch(logout())
  }

  getHeaderClasses() {
    return {
      fill: this.router.url.indexOf('/selection') !== -1,
    }
  }
}
