import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LocalizeService } from '@shared/services/localize.service';
import { ProductsService } from '@shared/services/products.service';
import { IProduct } from '@shared/interfaces/catalog/product.interface';
import { SelectQuantityComponent } from '@shared/components/select-quantity/select-quantity.component';

@Component({
  selector: 'mc-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild(SelectQuantityComponent)
  public quantity: SelectQuantityComponent;
  public productId: string;
  public product$: Observable<IProduct | null>;
  public numberImage: number;
  public quantityProduct: number;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public localize: LocalizeService,
    private catalogService: ProductsService,
    private route: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params): void => this.productId = params.id);

    this.product$ = this.catalogService.getProduct(this.productId);

    this.numberImage = 0;
  }

  public ngAfterViewChecked(): void {
    if (this.quantity) this.quantityProduct = this.quantity.selectedQuantity;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onChangeImage(imageIndex: number): void {
    this.numberImage = imageIndex;
  }

  public addToCart(): void {
    alert(`ID: ${ this.productId }, VARIANT: ${ this.numberImage }, QUANTITY: ${ this.quantityProduct }`);
    this.quantity.selectedQuantity = 1;
  }
}
