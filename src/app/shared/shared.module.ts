import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AngularMaterialModule } from '../app-material.module'
import { FooterComponent } from './footer/footer.component'
import { HeaderModule } from './header/header.module'
import { SidebarComponent } from './sidebar/sidebar.component'
import { LayoutComponent } from './layout/layout.component'

@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    AngularMaterialModule,
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    LayoutComponent
  ]
})
export class SharedModule {}
