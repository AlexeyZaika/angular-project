import { Component } from '@angular/core';

import { LocalizeService } from '@shared/services/localize.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'mc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(public localize: LocalizeService, private authService: AuthService) {
  }

  public signOut(): void {
    this.authService.isLoggedIn$.next(false);
    this.authService.user$.next(null);
    localStorage.clear();
  }
}
