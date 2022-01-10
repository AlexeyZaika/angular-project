import { Component } from '@angular/core';

import { LocalizeService } from '@shared/services/localize.service';

@Component({
  selector: 'mc-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  constructor(public localize: LocalizeService) {
  }
}
