import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[outsideClick]',
})
export class OutsideClickDirective {
  @Output() public outsideClick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  @HostListener('document:mousedown', ['$event'])
  public onClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.outsideClick.emit(event);
    }
  }
}
