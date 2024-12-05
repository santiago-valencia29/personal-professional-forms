import { Component, OnInit } from '@angular/core'
import * as AOS from 'aos'
import { AppUpdateService } from './shared/services/app-update.service'
import { Store } from '@ngxs/store'
import { LoadProfessionals } from './shared/store/professional.state'
import { LoadPersonalData } from './shared/store/personal.state'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'personal-professional-forms'

  constructor(private sw: AppUpdateService,private store:Store) {}

  ngOnInit(): void {
    AOS.init()

    this.store.dispatch(new LoadProfessionals())
    this.store.dispatch(new LoadPersonalData())
  }
}
