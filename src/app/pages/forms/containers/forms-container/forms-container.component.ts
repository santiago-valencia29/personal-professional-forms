import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/UnsubscribeOnDestroyAdapter'
import { PersonalData } from '../../models/personal-data.model'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { ProfessionalData } from '../../models/professional-data.model'
import { Store } from '@ngxs/store'
import {
  ProfessionalState
} from 'src/app/shared/store/professional.state'
import { Title } from '@angular/platform-browser'
import {
  PersonalState
} from 'src/app/shared/store/personal.state'

@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.scss'],
  standalone: false
})
export class FormsContainerComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  private _titleService = inject(Title)

  personalDataColumns: string[] = ['#', 'name', 'surname', 'documentId', 'view']
  professionalDataColumns: string[] = [
    '#',
    'company',
    'startDate',
    'endDate',
    'view'
  ]

  dataSourceProfessionalData: MatTableDataSource<ProfessionalData>
  dataSourcePersonalData: MatTableDataSource<PersonalData>

  @ViewChild('sortPersonal', { static: true }) sortPersonal: MatSort
  @ViewChild('sortProfessional', { static: true }) sortProfessional: MatSort

  constructor(private store: Store) {
    super()
    this._titleService.setTitle('Respuestas')
  }

  ngOnInit() {
    this.store
      .select(ProfessionalState.getProfessionals)
      .subscribe((professionals) => {
        this.dataSourceProfessionalData = new MatTableDataSource(professionals)
        this.dataSourceProfessionalData.sort = this.sortProfessional
      })

    this.store.select(PersonalState.getPersonalData).subscribe((personal) => {
      this.dataSourcePersonalData = new MatTableDataSource(personal)
      this.dataSourcePersonalData.sort = this.sortPersonal
    })
  }
}
