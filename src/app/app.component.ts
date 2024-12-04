import { Component, OnInit } from '@angular/core'
import * as AOS from 'aos'
import { AppUpdateService } from './shared/services/app-update.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'personal-professional-forms'

  constructor(private sw: AppUpdateService) {}

  ngOnInit(): void {
    AOS.init()
  }
}
