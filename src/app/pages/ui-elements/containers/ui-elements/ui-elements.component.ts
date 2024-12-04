import { Component, OnInit,  } from '@angular/core'

import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/UnsubscribeOnDestroyAdapter'

@Component({
  selector: 'app-ui-elements',
  templateUrl: './ui-elements.component.html',
  styleUrls: ['./ui-elements.component.scss'],
  standalone: false
})
export class UiElementsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  constructor() {
    super()
  }

  ngOnInit() {}
}
