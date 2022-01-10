import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LocalizeService } from '@shared/services/localize.service';
import { ProductsService } from '@shared/services/products.service';
import { SortOption } from '@shared/enums/sort-option.enum';

@Component({
  selector: 'mc-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit, OnDestroy {
  public sortForm: FormGroup;
  public readonly SortOption = SortOption;
  
  constructor(
    public localize: LocalizeService,
    public catalogService: ProductsService,
    private fb: FormBuilder
  ) {
  }
  
  public ngOnInit(): void {
    this.sortForm = this.fb.group({
      sort: this.SortOption.defaultOption,
    });
  }

  public ngOnDestroy(): void {
    this.catalogService.sortValue$.next(this.SortOption.defaultOption);
  }

  public onChange(): void {
    this.catalogService.sortValue$.next(+this.sortForm.value.sort);
  }
}
