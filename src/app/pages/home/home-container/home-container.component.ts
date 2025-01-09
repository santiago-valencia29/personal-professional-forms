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

  private _titleService = inject(Title)

  constructor(private messageService: MessageService) {
    this._titleService.setTitle('Inicio')
  }

  ngOnInit() {}
}
