import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiElementsComponent } from './containers/ui-elements/ui-elements.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { AngularMaterialModule } from 'src/app/app-material.module'
import { IconsComponent } from './components/icons/icons.component'
import { uiElementsRoutingModule } from './ui-elements-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SliderComponent } from './components/slider/slider.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    uiElementsRoutingModule,
    SharedModule
  ],
  exports: [
    UiElementsComponent,
    IconsComponent,
    SliderComponent,
  ],
  declarations: [
    UiElementsComponent,
    IconsComponent,
    SliderComponent,
  ]
})
export class UiElementsModule {}
