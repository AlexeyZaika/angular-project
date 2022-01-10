import { Component } from '@angular/core';

import { LocalizeService } from '@shared/services/localize.service';

@Component({
  selector: 'mc-notFound',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(public localize: LocalizeService) {
  }
}
