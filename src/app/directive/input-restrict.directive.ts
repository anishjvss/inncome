import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputRestrict]'
})
export class InputRestrictDirective {
  @Input('appInputRestrict') allowedChars!: 'alphabet' | 'number';

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initalValue = this.el.nativeElement.value;

    switch (this.allowedChars) {
      case 'alphabet':
        this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z]*/g, '');
        break;
      case 'number':
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        break;
      default:
        break;
    }

    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
