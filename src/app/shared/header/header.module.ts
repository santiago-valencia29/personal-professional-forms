import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AngularMaterialModule } from 'src/app/app-material.module'
import { RouterModule } from '@angular/router'
import { HeaderComponent } from './containers/header/header.component'

@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  declarations: [
    HeaderComponent,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
