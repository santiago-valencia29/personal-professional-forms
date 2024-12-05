import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PersonalData } from '../../models/personal-data.model'
import { Title } from '@angular/platform-browser'
import { Store } from '@ngxs/store'
import { SwalAlertService } from 'src/app/shared/services/swal-alert.service'
import { SavePersonal } from 'src/app/shared/store/personal.state'

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],
  standalone: false
})
export class PersonalFormComponent implements OnInit {
  private _titleService = inject(Title)

  formPersonal!: FormGroup
  isReadOnly = false
  personalData: PersonalData | undefined

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private swalAlertService: SwalAlertService,
    private router: Router
  ) {
    this._titleService.setTitle('Datos Personales')
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe((params) => {
      if (params['name'] && params['surname'] && params['documentId']) {
        this.personalData = {
          name: params['name'],
          surname: params['surname'],
          documentId: params['documentId']
        }
        this.isReadOnly = true
        this.initFormWithData(this.personalData)
      } else {
        this.isReadOnly = false
        this.initForm()
      }
    })
  }

  private initForm() {
    this.formPersonal = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      documentId: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    })
  }

  private initFormWithData(data: PersonalData) {
    this.formPersonal = this.fb.group({
      name: [
        { value: data.name, disabled: this.isReadOnly },
        [Validators.required]
      ],
      surname: [
        { value: data.surname, disabled: this.isReadOnly },
        [Validators.required]
      ],
      documentId: [
        { value: data.documentId, disabled: this.isReadOnly },
        [Validators.required, Validators.pattern(/^\d+$/)]
      ]
    })
  }

  savePersonalData() {
    this.swalAlertService.loading('Guardando...')

    const formValue = this.formPersonal.getRawValue()
    const personalData: PersonalData = {
      name: formValue.name,
      surname: formValue.surname,
      documentId: formValue.documentId
    }
    setTimeout(() => {
      this.store.dispatch(new SavePersonal(personalData)).subscribe({
        next: () => {
          this.swalAlertService.toast(
            'Exito',
            'Información Personal se ha guardado correctamente',
            'success',
            7000
          )
          this.router.navigate(['/forms-answers'])
        },
        error: (err) => {
          this.swalAlertService.toast(
            'Error',
            'Ocurrió un error al guardar la información personal',
            'error',
            7000
          )
        }
      })
    }, 2000)
  }
}
