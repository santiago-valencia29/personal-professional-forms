import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-professional-form',
    templateUrl: './professional-form.component.html',
    styleUrls: ['./professional-form.component.scss'],
    standalone: false
})
export class ProfessionalFormComponent implements OnInit {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k'
    }

    return `${value}`
  }

  constructor() {}

  ngOnInit() {}
}
