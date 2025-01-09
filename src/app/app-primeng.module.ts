import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { ListboxModule } from 'primeng/listbox'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MessageService } from 'primeng/api'

const primengModules = [
  ButtonModule,
  DialogModule,
  ListboxModule,
  IconFieldModule,
  InputIconModule,
  InputTextModule,
  InputGroupModule,
  InputGroupAddonModule,
  SplitButtonModule,
  ToastModule
]

@NgModule({
  imports: [CommonModule, ...primengModules],
  exports: [...primengModules],
  providers: [MessageService]
})
export class PrimengModule {}
