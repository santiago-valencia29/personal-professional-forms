import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProfessionalData } from '../../models/professional-data.model'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.scss'],
  standalone: false
})
export class ProfessionalFormComponent implements OnInit {
  formProfessional!: FormGroup
  isReadOnly = false
  professionalData: ProfessionalData | undefined

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
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
}
