import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { LocalizeService } from '@shared/services/localize.service';
import { ProductsService } from '@shared/services/products.service';
import { IProduct } from '@shared/interfaces/catalog/product.interface';
import { IFilterValues } from '@shared/interfaces/filter/filter-values.interface';

enum PaginationNumber {
  number = 6,
}

@Component({
  selector: 'mc-catalog-page',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  public products: IProduct[];
  public isActiveTilesType = true;
  public paginationIterator = PaginationNumber.number;
  public quantityProduct: number;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public localize: LocalizeService,
    public catalogService: ProductsService,
  ) {
  }

  public ngOnInit(): void {
    this.initializeListeners();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public initializeListeners(): void {
    this.catalogService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((catalog: IProduct[]) => this.products = catalog);

    combineLatest([this.catalogService.filterValues$, this.catalogService.sortValue$, this.catalogService.searchValue$])
      .pipe(
        switchMap(([filterValue, sortValue, searchValue]: [IFilterValues, number, string]): Observable<IProduct[]> => {
          return this.catalogService.getProducts(filterValue, sortValue, searchValue);
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((catalog: IProduct[]): void => {
        this.products = catalog;
        this.quantityProduct = this.products.length;
      });
  }

  public toggleTypeProductTape(isActiveTilesType: boolean): void {
    this.isActiveTilesType = isActiveTilesType;
  }

  public showMoreProduct(): void {
    if (this.paginationIterator < this.quantityProduct) {
      this.paginationIterator += PaginationNumber.number;
    }
  }
}
