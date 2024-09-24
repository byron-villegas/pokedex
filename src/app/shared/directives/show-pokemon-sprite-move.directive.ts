import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Event } from 'src/app/core/constants/event';
import { Pokemon } from 'src/app/core/models/pokemon';

@Directive({
  selector: '[showPokemonSpriteMove]'
})
export class ShowPokemonSpriteMoveDirective {

  @Input() pokemon: Pokemon | undefined;
  
  constructor(private elementRef: ElementRef) { }

  @HostListener(Event.MOUSEENTER, ['$event'])
  onMouseEnter() {
    this.elementRef.nativeElement.src = this.elementRef.nativeElement.src.includes('shiny') ? this.pokemon?.sprites.front_shiny_move : this.pokemon?.sprites.front_default_move;
  }

  @HostListener(Event.MOUSELEAVE, ['$event'])
  onMouseLeave() {
    this.elementRef.nativeElement.src = this.elementRef.nativeElement.src.includes('shiny') ? this.pokemon?.sprites.front_shiny : this.pokemon?.sprites.front_default;
  }
}