import { Component, EventEmitter, Output } from '@angular/core';

import { LocalizeService } from '@shared/services/localize.service';
import { Router } from '@shared/enums/router.enum';

@Component({
  selector: 'mc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() public isVisible = new EventEmitter<boolean>();

  public readonly routerLink = Router;
  private isVisibleCatalog = false;

  constructor(public localize: LocalizeService) {
  }

  public showCatalog(): void {
    this.isVisibleCatalog = !this.isVisibleCatalog;
    this.isVisible.emit(this.isVisibleCatalog);
  }
}
