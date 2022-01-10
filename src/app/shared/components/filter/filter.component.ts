import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { FilterService } from '@shared/services/filter.service';
import { ProductsService } from '@shared/services/products.service';
import { LocalizeService } from '@shared/services/localize.service';
import { ICategory } from '@shared/interfaces/filter/category.interface';
import { ICompany } from '@shared/interfaces/filter/company.interface';
import { ICountry } from '@shared/interfaces/filter/country.interface';
import { IMaterial } from '@shared/interfaces/filter/material.interface';
import { FilterPoint } from '@shared/enums/filter-point.enum';
import { ILimitPrice } from '@shared/interfaces/filter/limit-price.interface';
import { IProduct } from '@shared/interfaces/catalog/product.interface';
import { IFilterCheckboxList } from '@shared/interfaces/filter/filter-checkbox-list.interface';
import { IFilterValues } from '@shared/interfaces/filter/filter-values.interface';
import { filterDefaultValues } from '@shared/constants/filter-default-values';

@Component({
  selector: 'mc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  public filterForm: FormGroup;
  public categories: ICategory[] = [];
  public companies: ICompany[] = [];
  public countries: ICountry[] = [];
  public materials: IMaterial[] = [];
  public nameBlockFilter: string;
  public limitPriceProduct: ILimitPrice = {
    minPrice: 0,
    maxPrice: 0,
  };
  public checkboxList: IFilterCheckboxList = {
    categories: [],
    companies: [],
    countries: [],
    materials: [],
  };
  public readonly FilterPoint = FilterPoint;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public localize: LocalizeService,
    public filterService: FilterService,
    public catalogService: ProductsService,
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.catalogService.filterValues$.next(filterDefaultValues);
  }

  public get categoriesFormArray(): FormArray {
    return this.filterForm.controls.category as FormArray;
  }

  public get companiesFormArray(): FormArray {
    return this.filterForm.controls.company as FormArray;
  }

  public countriesFormArray(): FormArray {
    return this.filterForm.controls.country as FormArray;
  }

  public materialsFormArray(): FormArray {
    return this.filterForm.controls.material as FormArray;
  }

  public toggleVisibleBlockFilter(nameBlock: string): void {
    this.nameBlockFilter = this.nameBlockFilter === nameBlock ? '' : nameBlock;
  }

  public disabledCheckbox(checkboxList: string[], checkboxGroup: string): string | null {
    return !checkboxList.includes(checkboxGroup) ? '' : null;
  }

  public onSubmit(): void {
    const selectedCategory = this.selectedCheckbox(this.filterForm.value.category, this.categories);
    const selectedCompany = this.selectedCheckbox(this.filterForm.value.company, this.companies);
    const selectedCountry = this.selectedCheckbox(this.filterForm.value.country, this.countries);
    const selectedMaterial = this.selectedCheckbox(this.filterForm.value.material, this.materials);

    if (this.filterForm.valid) {
      this.catalogService.filterValues$.next({
        minPrice: this.filterForm.value.minPrice,
        maxPrice: this.filterForm.value.maxPrice,
        category: selectedCategory,
        company: selectedCompany,
        country: selectedCountry,
        material: selectedMaterial,
      });
      this.checkboxList.categories = [];
      this.checkboxList.companies = [];
      this.checkboxList.countries = [];
      this.checkboxList.materials = [];
    }
  }

  public clearFilter(): void {
    this.filterForm.reset({
      minPrice: this.limitPriceProduct.minPrice,
      maxPrice: this.limitPriceProduct.maxPrice,
    });
    this.catalogService.filterValues$.next(filterDefaultValues);
    this.checkboxList.categories = [];
    this.checkboxList.companies = [];
    this.checkboxList.countries = [];
    this.checkboxList.materials = [];
  }

  private initializeValues(): void {
    this.filterService.getCategory()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((categories: ICategory[]) => {
        categories.forEach((category) => this.checkboxList.categories.push(category.name));
        this.categories = categories;
        this.addCheckboxesToCategories();
      });
    this.filterService.getCompany()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((companies: ICompany[]) => {
        companies.forEach((company) => this.checkboxList.companies.push(company.name));
        this.companies = companies;
        this.addCheckboxesToCompanies();
      });
    this.filterService.getCountry()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((countries: ICountry[]) => {
        countries.forEach((country) => this.checkboxList.countries.push(country.name));
        this.countries = countries;
        this.addCheckboxesToCountries();
      });
    this.filterService.getMaterial()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((materials: IMaterial[]) => {
        materials.forEach((material) => this.checkboxList.materials.push(material.name));
        this.materials = materials;
        this.addCheckboxesToMaterials();
      });

    this.filterForm = this.fb.group({
      minPrice: [''],
      maxPrice: [''],
      category: this.fb.array([]),
      company: this.fb.array([]),
      country: this.fb.array([]),
      material: this.fb.array([]),
    });
  }

  private initializeListeners(): void {
    this.catalogService.getLimitPriceProduct()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: ILimitPrice) => {
        this.limitPriceProduct = value;
        this.filterForm.patchValue({
          minPrice: this.limitPriceProduct.minPrice,
          maxPrice: this.limitPriceProduct.maxPrice,
        });
      });

    this.catalogService.searchValue$
      .pipe(
        filter(response => !!response),
        switchMap((searchValue: string): Observable<IProduct[]> => {
          return this.catalogService.getProducts(null, null, searchValue)
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((catalog: IProduct[]): void => {
        this.clearFilter();
        this.getCheckboxList(catalog);
      });

    this.catalogService.filterValues$
      .pipe(
        filter(res => !!res.minPrice),
        switchMap((filterValue: IFilterValues): Observable<IProduct[]> => {
          return this.catalogService.getProducts(filterValue, null, null)
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((catalog: IProduct[]): void => this.getCheckboxList(catalog));
  }

  private addCheckboxesToCategories(): void {
    this.categories.forEach(() => this.categoriesFormArray.push(new FormControl(false)));
  }

  private addCheckboxesToCountries(): void {
    this.countries.forEach(() => this.countriesFormArray().push(new FormControl(false)));
  }

  private addCheckboxesToCompanies(): void {
    this.companies.forEach(() => this.companiesFormArray.push(new FormControl(false)));
  }

  private addCheckboxesToMaterials(): void {
    this.materials.forEach(() => this.materialsFormArray().push(new FormControl(false)));
  }

  private selectedCheckbox(checkboxArray: string[], checkboxList: ICategory[]): string[] {
    return checkboxArray
      .map((value: string, index: number) => value ? checkboxList[index].name : '')
      .filter((value: string) => value !== '');
  }

  private getCheckboxList(catalog: IProduct[]): void {
    catalog.forEach((product: IProduct): void => {
      if (!this.checkboxList.categories.includes(product.category.name)) {
        this.checkboxList.categories.push(product.category.name);
      }
      if (!this.checkboxList.companies.includes(product.company.name)) {
        this.checkboxList.companies.push(product.company.name);
      }
      if (!this.checkboxList.countries.includes(product.country.name)) {
        this.checkboxList.countries.push(product.country.name);
      }

      product.material.forEach((material): void => {
        if (!this.checkboxList.materials.includes(material.name)) {
          this.checkboxList.materials.push(material.name);
        }
      });
    });
  }
}
