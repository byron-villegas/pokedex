import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowPokemonSpriteMoveDirective } from './directives/show-pokemon-sprite-move.directive';
import { SpecialCharactersDirective } from './directives/special-characters.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpecialCharactersDirective, ShowPokemonSpriteMoveDirective],
  exports: [SpecialCharactersDirective, ShowPokemonSpriteMoveDirective],
  providers: [SpecialCharactersDirective, ShowPokemonSpriteMoveDirective]

})
export class SharedModule { }