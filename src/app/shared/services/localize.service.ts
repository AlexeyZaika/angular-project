import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ILocalize } from '@shared/interfaces/localize/localize.interface';

@Injectable({ providedIn: 'root' })
export class LocalizeService {
  private currentLanguage = this.translate.defaultLang;

  constructor(private translate: TranslateService) {
  }

  public async changeLanguage(language: string): Promise<void> {
    if (this.currentLanguage !== language) {
      await this.translate.use(language).toPromise();
      this.currentLanguage = language;
    }
  }

  public get store(): ILocalize {
    return this.translate.store.translations[this.currentLanguage];
  }
}
