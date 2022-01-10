import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[scrollDocument]',
})
export class ScrollDirective {
  @Output() public scrollDocument: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  @HostListener('document:scroll', ['$event'])
  public onScroll(event: MouseEvent): void {
    if (this.el.nativeElement.offsetHeight - window.innerHeight + 300 <= window.pageYOffset && this.el.nativeElement.offsetHeight - window.innerHeight + 310 >= window.pageYOffset) {
      this.scrollDocument.emit(event);
    }
  }
}
