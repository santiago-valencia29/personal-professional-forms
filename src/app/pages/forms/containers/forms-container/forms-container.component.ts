import { Component, OnInit,  } from '@angular/core'

import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/UnsubscribeOnDestroyAdapter'

@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.scss'],
  standalone: false
})
export class FormsContainerComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  constructor() {
    super()
  }

  ngOnInit() {}
}
