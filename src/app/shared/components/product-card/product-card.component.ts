import { AfterViewChecked, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { IProduct } from '@shared/interfaces/catalog/product.interface';
import { LocalizeService } from '@shared/services/localize.service';
import { SelectQuantityComponent } from '@shared/components/select-quantity/select-quantity.component';

@Component({
  selector: 'mc-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() public product: IProduct;
  @Input() public isTypeProductTapeTiles: boolean;
  @ViewChild(SelectQuantityComponent)
  public quantity: SelectQuantityComponent;
  public dataProduct: IProduct;
  public numberImage = 0;
  public isActiveTilesType: boolean;
  public quantityProduct: number;

  constructor(public localize: LocalizeService) {
  }

  public ngOnInit(): void {
    this.dataProduct = this.product;
  }

  public ngAfterViewChecked(): void {
    if (this.quantity) this.quantityProduct = this.quantity.selectedQuantity;
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.isActiveTilesType = this.isTypeProductTapeTiles;
  }

  public onChangeImage(imageIndex: number): void {
    this.numberImage = imageIndex;
  }

  public addToCart(): void {
    alert(`ID: ${this.dataProduct.id}, VARIANT: ${this.numberImage}, QUANTITY: ${this.quantityProduct}`)
  }
}
