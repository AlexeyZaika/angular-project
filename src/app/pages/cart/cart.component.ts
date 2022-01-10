import { Component } from '@angular/core';

import { LocalizeService } from '@shared/services/localize.service';

@Component({
  selector: 'mc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(public localize: LocalizeService) {
  }
}
