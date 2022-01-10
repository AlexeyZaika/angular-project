import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LocalizeService } from '@shared/services/localize.service';
import { ProductsService } from '@shared/services/products.service';
import { IProduct } from '@shared/interfaces/catalog/product.interface';

@Component({
  selector: 'mc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public products: IProduct[] = [];
  public isVisible = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public localize: LocalizeService,
    public catalogService: ProductsService,
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.initializeListeners();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.catalogService.searchValue$.next('');
  }

  public initializeListeners(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const searchValue = this.searchForm.value.search.trim();
    this.catalogService.searchValue$.next(searchValue);

    if (this.searchForm.valid && searchValue) {
      this.isVisible = false;
    }
  }

  public onChange(): void {
    const searchValue: string = this.searchForm.value.search.trim().toLocaleLowerCase();
    this.isVisible = true;

    if (this.searchForm.valid && searchValue) {
      this.catalogService.getProducts(null, null, searchValue)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((catalog: IProduct[]): void => {
          this.products = catalog;
        });
    }

    if (!searchValue) {
      this.products = [];
      this.isVisible = false;
      this.catalogService.searchValue$.next('');
    }
  }
}
