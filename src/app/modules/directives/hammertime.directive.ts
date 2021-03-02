import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  Injectable,
} from '@angular/core'

@Directive({
  selector: '[appHammertime]',
})
export class HammertimeDirective {
  @Output() tripleTap = new EventEmitter()

  constructor() {}

  @HostListener('tap', ['$event'])
  onTap(e) {
    if (e.tapCount === 3) {
      this.tripleTap.emit(e)
    }
  }
}
