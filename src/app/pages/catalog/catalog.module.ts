import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogComponent } from './catalog.component';
import { SharedModule } from '@shared/shared.module';
import { ToggleTypeProductTapeComponent } from '@pages/catalog/components/toggle-type-product-tape/toggle-type-product-tape.component';
import { SortingComponent } from '@pages/catalog/components/sorting/sorting.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CatalogComponent,
    ToggleTypeProductTapeComponent,
    SortingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CatalogModule {
}
