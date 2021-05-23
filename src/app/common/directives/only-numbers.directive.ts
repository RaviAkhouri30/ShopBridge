import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  private regEx: RegExp = new RegExp(/^[0-9]+$/);

  /**
   * @description To enable working of these keys along with Alphabets and space
   */
  private specialKeys: Array<string> = ['Tab', 'Ctrl', 'Shift', 'Del', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keydown', ['$event'])
  public onKeyDown = (event: KeyboardEvent) => {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const possition: number = this.el.nativeElement.selectionStart;

    const next: string = [
      current.slice(0, possition),
      event.key
    ].join('');

    if (next && !next.match(this.regEx)) {
      event.preventDefault();
    }

  }

}
