import { Component, OnInit } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: false
})
export class LayoutComponent implements OnInit {
  sidenav!: MatSidenav
  public isShowSidebar: boolean

  constructor() {
    this.isShowSidebar = false
  }

  ngOnInit() {}
}
