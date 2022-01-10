import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from 'assets/i18n/ru.json';
import { Localize } from '@shared/enums/localize.enum';
import { AuthService } from '@shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '@shared/interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userId: string | null;
  private unsubscribe$ = new Subject<void>();

  constructor(private translate: TranslateService, private authService: AuthService) {
    translate.setTranslation(Localize.ru, defaultLanguage);
    translate.setDefaultLang(Localize.ru);
  }

  public ngOnInit(): void {
    this.userId = localStorage.getItem('token');

    if (this.userId) {
      this.authService.getUser(this.userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((user: IUser | null): void => {
          if (user) {
            this.authService.isLoggedIn$.next(true);
            this.authService.user$.next(user);
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
