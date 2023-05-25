import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'

import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AuthDialogComponent, {
      width: '514px',
      ariaModal: true,
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  getHeaderClasses() {
    return {
      fill: this.router.url.indexOf('/selection') !== -1,
    }
  }
}
