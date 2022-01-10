import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SearchComponent } from '@shared/components/search/search.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { CatalogComponent } from '@shared/components/catalog/catalog.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ProductsService } from '@shared/services/products.service';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { FilterService } from '@shared/services/filter.service';
import { OutsideClickDirective } from '@shared/directive/outside-click.directive';
import { ScrollDirective } from '@shared/directive/scroll.directive';
import { SelectQuantityComponent } from '@shared/components/select-quantity/select-quantity.component';
import { AuthService } from '@shared/services/auth.service';

@NgModule({
  declarations: [
    SearchComponent,
    NavbarComponent,
    CatalogComponent,
    ProductCardComponent,
    FilterComponent,
    OutsideClickDirective,
    ScrollDirective,
    SelectQuantityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    SearchComponent,
    NavbarComponent,
    CatalogComponent,
    ProductCardComponent,
    FilterComponent,
    OutsideClickDirective,
    ScrollDirective,
    SelectQuantityComponent,
  ],
  providers: [
    ProductsService,
    FilterService,
    AuthService,
  ],
})
export class SharedModule {
}
