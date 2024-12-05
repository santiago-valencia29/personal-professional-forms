import { LOCALE_ID, NgModule } from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common'
import { FormsContainerComponent } from './containers/forms-container/forms-container.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { AngularMaterialModule } from 'src/app/app-material.module'
import { PersonalFormComponent } from './components/personal-form/personal-form.component'
import { FormsContainerRoutingModule } from './forms-container-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProfessionalFormComponent } from './components/professional-form/professional-form.component'
import localeEs from '@angular/common/locales/es-CO';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { MY_FORMATS_DATE } from 'src/app/shared/utils/custom-date-adapter'
import { MomentDateAdapter } from '@angular/material-moment-adapter'

registerLocaleData(localeEs, 'es-CO');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsContainerRoutingModule,
    SharedModule
  ],
  exports: [
    FormsContainerComponent,
    PersonalFormComponent,
    ProfessionalFormComponent
  ],
  declarations: [
    FormsContainerComponent,
    PersonalFormComponent,
    ProfessionalFormComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' }, {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },]


})
export class FormsContainerModule {}
