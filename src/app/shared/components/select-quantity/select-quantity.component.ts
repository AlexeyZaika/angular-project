import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const BACKSPASE_BUTTON = 'Backspace';

@Component({
  selector: 'mc-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
})
export class SelectQuantityComponent implements OnInit {
  public selectedQuantity = 1;
  public formSelectQuantity: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.formSelectQuantity = this.fb.group({
      quantity: this.selectedQuantity,
    });
  }

  public minusQuantity(): void {
    if (this.formSelectQuantity.value.quantity > 1) {
      this.selectedQuantity--;
      this.formSelectQuantity.patchValue({
        quantity: this.selectedQuantity,
      });
    }
  }

  public plusQuantity(): void {
    if (this.formSelectQuantity.value.quantity < 100) {
      this.selectedQuantity++;
      this.formSelectQuantity.patchValue({
        quantity: this.selectedQuantity,
      });
    }
  }

  public numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.key;
    const inputLength = this.formSelectQuantity.value.quantity.toString().length;
    console.log(charCode);

    if (inputLength === 0 && +charCode === 0) {
      return false;
    }

    if ((charCode !== BACKSPASE_BUTTON) && (isNaN(+charCode) || inputLength > 1)) {
      return false;
    }

    return true;
  }

  public onInput(): void {
    this.selectedQuantity = this.formSelectQuantity.value.quantity;
  }
}
