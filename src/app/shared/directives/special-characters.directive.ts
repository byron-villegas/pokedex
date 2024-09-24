import { Directive, ElementRef, HostListener } from '@angular/core';
import { ContentType } from 'src/app/core/constants/content-type';
import { Event } from 'src/app/core/constants/event';
import { Regex } from 'src/app/core/constants/regex';

@Directive({
  selector: '[specialCharacters]'
})
export class SpecialCharactersDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener(Event.KEYPRESS, ['$event'])
  onKeyPress(event: KeyboardEvent) {
    return new RegExp(Regex.ONLY_NORMAL_CHARACTERS).test(event.key);
  }

  @HostListener(Event.PASTE, ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault(); // Frena el evento
    this.elementRef.nativeElement.value = event.clipboardData!.getData(ContentType.TEXT_PLAIN).replace(Regex.ONLY_NORMAL_CHARACTERS_REPLACE, '');
  }
}