import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalizeService } from '@shared/services/localize.service';
import { Localize } from '@shared/enums/localize.enum';
import { Router } from '@shared/enums/router.enum';
import { AuthService } from '@shared/services/auth.service';
import { IUser } from '@shared/interfaces/user/user.interface';

@Component({
  selector: 'mc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isVisibleCatalog = false;
  public readonly Localize = Localize;
  public readonly Router = Router;
  public isLoggedIn$: Observable<boolean>;
  public user$: Observable<IUser | null>;

  constructor(public localize: LocalizeService, public authService: AuthService) {
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  public isVisible(isVisibleCatalog: boolean): void {
    this.isVisibleCatalog = isVisibleCatalog;
  }
}
