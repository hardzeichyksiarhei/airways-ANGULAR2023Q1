import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  exports: [CommonModule, MatInputModule, MatFormFieldModule, MatSelectModule],
})
export class MaterialModule {}
