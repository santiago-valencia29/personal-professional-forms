import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'
import { HomeContainerComponent } from './home-container/home-container.component'
// import { ButtonModule } from 'primeng/button'
// import { DialogModule } from 'primeng/dialog'
// import { ListboxModule } from 'primeng/listbox'
import { FormsModule } from '@angular/forms'
import { PrimengModule } from 'src/app/app-primeng.module'
// import { IconFieldModule } from 'primeng/iconfield'
// import { InputIconModule } from 'primeng/inputicon'
// import { InputTextModule } from 'primeng/inputtext'
// import { InputGroupModule } from 'primeng/inputgroup'
// import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { ToastModule } from 'primeng/toast';




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
