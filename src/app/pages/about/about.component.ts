import { Component } from '@angular/core';

import { LocalizeService } from '@shared/services/localize.service';

@Component({
  selector: 'mc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(public localize: LocalizeService) {
  }
}
