import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProfessionalData } from '../../models/professional-data.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngxs/store'
import { SaveProfessional } from 'src/app/shared/store/professional.state'
import { SwalAlertService } from 'src/app/shared/services/swal-alert.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.scss'],
  standalone: false
})
export class ProfessionalFormComponent implements OnInit {
  private _titleService = inject(Title)
  formProfessional!: FormGroup
  isReadOnly = false
  professionalData: ProfessionalData | undefined

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private swalAlertService: SwalAlertService,
    private router: Router
  ) {
    this._titleService.setTitle('Datos Profesionales')

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe((params) => {
      if (params['company'] && params['startDate'] && params['endDate']) {
        this.professionalData = {
          company: params['company'],
          startDate: new Date(params['startDate']),
          endDate: new Date(params['endDate'])
        }
        this.isReadOnly = true
        this.initFormWithData(this.professionalData)
      } else {
        this.isReadOnly = false
        this.initForm()
      }
    })
  }

  private initForm() {
    this.formProfessional = this.fb.group({
      company: ['', [Validators.required]],
      dateRange: this.fb.group({
        start: [null, [Validators.required]],
        end: [null, [Validators.required]]
      })
    })
  }

  private initFormWithData(data: ProfessionalData) {
    this.formProfessional = this.fb.group({
      company: [
        { value: data.company, disabled: this.isReadOnly },
        [Validators.required]
      ],
      dateRange: this.fb.group({
        start: [
          { value: data.startDate, disabled: this.isReadOnly },
          [Validators.required]
        ],
        end: [
          { value: data.endDate, disabled: this.isReadOnly },
          [Validators.required]
        ]
      })
    })
  }

  get dateRangeGroup(): FormGroup {
    return this.formProfessional.get('dateRange') as FormGroup
  }

  saveProfessional() {
    this.swalAlertService.loading('Guardando...')

    const formValue = this.formProfessional.getRawValue()
    const professionalData: ProfessionalData = {
      company: formValue.company,
      startDate: formValue.dateRange.start,
      endDate: formValue.dateRange.end
    }
    setTimeout(() => {
      this.store.dispatch(new SaveProfessional(professionalData)).subscribe({
        next: () => {
          this.swalAlertService.toast(
            'Exito',
            'Información profesional se ha guardado correctamente',
            'success',
            7000
          )
          this.router.navigate(['/forms-answers'])
        },
        error: (err) => {
          this.swalAlertService.toast(
            'Error',
            'Ocurrió un error al guardar la información de profesional',
            'error',
            7000
          )
        }
      })
    }, 2000)
  }
}
