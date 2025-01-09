import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'
import { HomeContainerComponent } from './home-container/home-container.component'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ListboxModule
  ],
  declarations: [HomeContainerComponent]
})
export class HomeModule {}
