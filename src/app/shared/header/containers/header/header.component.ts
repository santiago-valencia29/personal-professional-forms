import { Component, EventEmitter, Input, Output } from '@angular/core'
import { routes } from 'src/app/shared/routes/routes'
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean = false
  @Output() isShowSidebar = new EventEmitter<boolean>()

  public routers: typeof routes = routes
  showIconTitleResponsive: boolean = false

  constructor(
    public breakpointObserver: BreakpointObserver
  ) {
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened
    this.isShowSidebar.emit(this.isMenuOpened)
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 453px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showIconTitleResponsive = true
        } else {
          this.showIconTitleResponsive = false
        }
      })
  }
}
