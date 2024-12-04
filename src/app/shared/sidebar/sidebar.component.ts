import { Component, OnInit } from '@angular/core'
import { routes } from '../routes/routes'
import { UnsubscribeOnDestroyAdapter } from '../utils/UnsubscribeOnDestroyAdapter'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public routes: typeof routes = routes

  constructor() {
    super()
  }

  ngOnInit() {}
}
