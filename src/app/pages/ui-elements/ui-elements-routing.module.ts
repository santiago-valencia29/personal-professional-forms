import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { IconsComponent } from './components/icons/icons.component'
import { SliderComponent } from './components/slider/slider.component'

const routes: Routes = [

  {
    path: 'icons',
    component: IconsComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class uiElementsRoutingModule {}
