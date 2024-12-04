import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'
import { HomeContainerComponent } from './home-container/home-container.component'

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeContainerComponent]
})
export class HomeModule {}
