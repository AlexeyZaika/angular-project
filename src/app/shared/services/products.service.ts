import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Endpoint } from '@shared/enums/endpoint.enum';
import { IProduct } from '@shared/interfaces/catalog/product.interface';
import { ILimitPrice } from '@shared/interfaces/filter/limit-price.interface';
import { IFilterValues } from '@shared/interfaces/filter/filter-values.interface';
import { SortOption } from '@shared/enums/sort-option.enum';
import { filterDefaultValues } from '@shared/constants/filter-default-values';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsService {
  public readonly SortOption = SortOption;
  public filterValues$ = new BehaviorSubject<IFilterValues>(filterDefaultValues);
  public sortValue$ = new BehaviorSubject<number>(this.SortOption.defaultOption);
  public searchValue$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  public getProducts(filterValues?: IFilterValues | null, sortValue?: number | null, searchValue?: string | null): Observable<IProduct[]> {
    const url = `${environment.baseUrl}${ Endpoint.products }`;

    return this.http.get<IProduct[]>(url).pipe(
      map((products: IProduct[]): IProduct[] => searchValue ? this.filterProductsBySearch(products, searchValue) : products),
      map((products: IProduct[]): IProduct[] => filterValues ? this.filterProductsByPrice(products, filterValues.minPrice, filterValues.maxPrice) : products),
      map((products: IProduct[]): IProduct[] => filterValues ? this.filterProductsByCategory(products, filterValues.category) : products),
      map((products: IProduct[]): IProduct[] => filterValues ? this.filterProductsByCompany(products, filterValues.company) : products),
      map((products: IProduct[]): IProduct[] => filterValues ? this.filterProductsByCountry(products, filterValues.country) : products),
      map((products: IProduct[]): IProduct[] => filterValues ? this.filterProductsByMaterial(products, filterValues.material) : products),
      map((products: IProduct[]): IProduct[] => sortValue ? this.sortProducts(products, sortValue) : products),
    );
  }

  public getProduct(productId: string): Observable<IProduct | null> {
    const url = `${environment.baseUrl}${ Endpoint.products }`;

    return this.http.get<IProduct[]>(url).pipe(
      map((products: IProduct[]): IProduct | null => {
        const product = products.find((product: IProduct) => product.id === productId);

        if (!product) return null;

        return product;
      }),
    );
  }

  public getLimitPriceProduct(): Observable<ILimitPrice> {
    const url = `${environment.baseUrl}${ Endpoint.products }`;

    return this.http.get<IProduct[]>(url)
      .pipe(
        map((products: IProduct[]) => products.map(product => product.price)),
        map((prices: number[]) => ({ minPrice: Math.min.apply(null, prices), maxPrice: Math.max.apply(null, prices) })),
      );
  }

  private filterProductsByPrice(catalog: IProduct[], minPrice: number, maxPrice: number): IProduct[] {
    return catalog.filter((product: IProduct) => product.price >= minPrice && product.price <= maxPrice);
  }

  private filterProductsByCategory(catalog: IProduct[], categories: string[]): IProduct[] {
    return categories.length > 0 ? catalog.filter((product: IProduct) => categories.includes(product.category.name)) : catalog;
  }

  private filterProductsByCompany(catalog: IProduct[], companies: string[]): IProduct[] {
    return companies.length > 0 ? catalog.filter((product: IProduct) => companies.includes(product.company.name)) : catalog;
  }

  private filterProductsByCountry(catalog: IProduct[], countries: string[]): IProduct[] {
    return countries.length > 0 ? catalog.filter((product: IProduct) => countries.includes(product.country.name)) : catalog;
  }

  private filterProductsByMaterial(catalog: IProduct[], materials: string[]): IProduct[] {
    return materials.length > 0 ? catalog.filter((product: IProduct) => product.material.some((material) => materials.includes(material.name))) : catalog;
  }

  private filterProductsBySearch(catalog: IProduct[], searchValue: string): IProduct[] {
    return catalog.filter((product: IProduct) => product.name.toLocaleLowerCase().includes(searchValue));
  }

  private sortProducts(catalog: IProduct[], sortValue: number): IProduct[] {
    switch (sortValue) {
      case this.SortOption.defaultOption:
        return catalog;
      case this.SortOption.fromMaxToMinOption:
        return catalog.sort((productPrev: IProduct, productNext: IProduct): number => {
          if (productPrev.price < productNext.price) return 1;
          if (productPrev.price === productNext.price) return 0;
          return -1;
        });
      case this.SortOption.fromMinToMaxOption:
        return catalog.sort((productPrev: IProduct, productNext: IProduct): number => {
          if (productPrev.price > productNext.price) return 1;
          if (productPrev.price === productNext.price) return 0;
          return -1;
        });
      case this.SortOption.nameProductOption:
        return catalog.sort((productPrev: IProduct, productNext: IProduct): number => {
          if (productPrev.name > productNext.name) return 1;
          if (productPrev.price === productNext.price) return 0;
          return -1;
        });
      default:
        return catalog;
    }
  }
}
