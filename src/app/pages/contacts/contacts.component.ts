import { Component } from '@angular/core';

import { LocalizeService } from '@shared/services/localize.service';

@Component({
  selector: 'mc-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  constructor(public localize: LocalizeService) {
  }
}
