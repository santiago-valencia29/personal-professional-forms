import { Component, OnInit, inject } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { MenuItem, MessageService } from 'primeng/api'

interface City {
  name: string
  code: string
}

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  standalone: false
})
export class HomeContainerComponent implements OnInit {
  display: boolean = true
  cities!: City[]
  selectedCity!: City
  items: MenuItem[]

  private _titleService = inject(Title)

  constructor(private messageService: MessageService) {
    this._titleService.setTitle('Inicio')
    this.items = [
      {
        label: 'Update',
        command: () => {
          this.update()
        }
      },
      {
        label: 'Delete',
        command: () => {
          this.delete()
        }
      },
      { label: 'Angular Website', url: 'http://angular.io' },
      { separator: true },
      { label: 'Upload', routerLink: ['/fileupload'] }
    ]
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ]
    // this.cities = []
    this.getCities()
  }

  getCities() {
    this.cities
  }

  save(severity: string) {
    this.messageService.add({
      severity: severity,
      summary: 'Success',
      detail: 'Data Saved'
    })
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated'
    })
  }

  delete() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Deleted'
    })
  }
}
