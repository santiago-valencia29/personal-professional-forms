import { Component, OnInit, inject } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  standalone: false
})
export class HomeContainerComponent implements OnInit {
  private _titleService = inject(Title)

  constructor() {
    this._titleService.setTitle('Inicio')
  }

  ngOnInit() {}
}
