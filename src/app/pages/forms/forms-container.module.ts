import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsContainerComponent } from './containers/forms-container/forms-container.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { AngularMaterialModule } from 'src/app/app-material.module'
import { PersonalFormComponent } from './components/personal-form/personal-form.component'
import { FormsContainerRoutingModule } from './forms-container-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProfessionalFormComponent } from './components/professional-form/professional-form.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsContainerRoutingModule,
    SharedModule
  ],
  exports: [FormsContainerComponent, PersonalFormComponent, ProfessionalFormComponent],
  declarations: [
    FormsContainerComponent,
    PersonalFormComponent,
    ProfessionalFormComponent
  ]
})
export class FormsContainerModule {}
