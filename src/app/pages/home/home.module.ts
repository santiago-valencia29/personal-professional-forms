import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'
import { HomeContainerComponent } from './home-container/home-container.component'
import { FormsModule } from '@angular/forms'
import { PrimengModule } from 'src/app/app-primeng.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PrimengModule
  ],
  declarations: [HomeContainerComponent],
  providers: []
})
export class HomeModule {}
