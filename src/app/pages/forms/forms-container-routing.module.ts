import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { PersonalFormComponent } from './components/personal-form/personal-form.component'
import { ProfessionalFormComponent } from './components/professional-form/professional-form.component'

const routes: Routes = [
  {
    path: 'personal-form',
    component: PersonalFormComponent
  },
  {
    path: 'professional-form',
    component: ProfessionalFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsContainerRoutingModule {}
