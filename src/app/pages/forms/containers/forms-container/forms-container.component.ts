import { Component, OnInit, ViewChild } from '@angular/core'
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/UnsubscribeOnDestroyAdapter'
import { PersonalData } from '../../models/personal-data.model'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { ProfessionalData } from '../../models/professional-data.model'

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
  personalData: PersonalData[] = [
    { name: 'Edy', surname: 'sdsd', documentId: 789012 },
    { name: 'Santiago', surname: 'gv', documentId: 1552 },
    { name: 'Jane', surname: 'd', documentId: 789012 }
  ]

  professionalData: ProfessionalData[] = [
    {
      company: 'Company A',
      startDate: new Date('2018-01-01T00:00:00-05:00'),
      endDate: new Date('2020-12-31T00:00:00-05:00')
    },
    {
      company: 'Company B',
      startDate: new Date('2021-01-01T00:00:00-05:00'),
      endDate: new Date('2023-11-30T00:00:00-05:00')
    }
  ]

  personalDataColumns: string[] = ['#', 'name', 'surname', 'documentId', 'view']
  professionalDataColumns: string[] = [
    '#',
    'company',
    'startDate',
    'endDate',
    'view'
  ]

  dataSourceProfessionalData: MatTableDataSource<ProfessionalData>;


  dataSourcePersonalData: MatTableDataSource<PersonalData>
  @ViewChild('sortPersonal', { static: true }) sortPersonal: MatSort;
  @ViewChild('sortProfessional', { static: true }) sortProfessional: MatSort;


  constructor() {
    super()
  }

  ngOnInit() {
    this.dataSourcePersonalData = new MatTableDataSource(this.personalData)
    this.dataSourcePersonalData.sort = this.sortPersonal


    this.dataSourceProfessionalData = new MatTableDataSource(this.professionalData);
    this.dataSourceProfessionalData.sort = this.sortProfessional;
  }
}
