import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mc-toggle-type-product-tape',
  templateUrl: './toggle-type-product-tape.component.html',
  styleUrls: ['./toggle-type-product-tape.component.scss'],
})
export class ToggleTypeProductTapeComponent {
  @Output() public isTypeProductTapeTiles = new EventEmitter<boolean>();
  
  public isActiveTilesType = true;
  
  public toggleTypeProductTape():void {
    this.isActiveTilesType = !this.isActiveTilesType;
    this.isTypeProductTapeTiles.emit(this.isActiveTilesType);
  }
}
