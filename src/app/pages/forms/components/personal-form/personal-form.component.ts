import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { PersonalData } from '../../models/personal-data.model'

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],
  standalone: false
})
export class PersonalFormComponent implements OnInit {
  formPersonal!: FormGroup
  isReadOnly = false
  personalData: PersonalData | undefined

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['name'] && params['surname'] && params['documentId']) {
        this.personalData = {
          name: params['name'],
          surname: params['surname'],
          documentId: params['documentId']
        }
        this.isReadOnly = true
      } else {
        this.isReadOnly = false
      }
      this.initForm()
    })
  }

  private initForm() {
    this.formPersonal = this.fb.group({
      name: [
        { value: this.personalData?.name || '', disabled: this.isReadOnly },
        [Validators.required]
      ],
      surname: [
        { value: this.personalData?.surname || '', disabled: this.isReadOnly },
        [Validators.required]
      ],
      documentId: [
        {
          value: this.personalData?.documentId || '',
          disabled: this.isReadOnly
        },
        [Validators.required, Validators.pattern(/^\d+$/)]
      ]
    })
  }
}
