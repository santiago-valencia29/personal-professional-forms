import { Component, OnInit, inject } from '@angular/core'
import { Title } from '@angular/platform-browser'

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  standalone: false
})
export class HomeContainerComponent implements OnInit {
  display: boolean = true;
  cities!: City[];
  selectedCity!: City;

  private _titleService = inject(Title)

  constructor() {
    this._titleService.setTitle('Inicio')

  }

   ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
