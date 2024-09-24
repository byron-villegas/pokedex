import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Chain } from "src/app/core/models/chain";
import { EvolutionChain } from "src/app/core/models/evolution-chain";
import { Pokemon } from "src/app/core/models/pokemon";
import { PokemonSprite } from "src/app/core/models/pokemon-sprite";
import { ShowPokemonSpriteMoveDirective } from "./show-pokemon-sprite-move.directive";

@Component({
    template: `<img showPokemonSpriteMove [pokemon]=pokemon src="{{img}}" />`,
})
class ShowPokemonShinySpriteMoveTestComponent {
    pokemonName = 'charmander';

    sprites: PokemonSprite = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: 'normal', front_default_move: 'normal.png', front_female: '', front_shiny: 'shiny', front_shiny_move: 'shiny.png', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    chain: Chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: this.sprites }
    evolution: EvolutionChain = { id: 1, chain: this.chain }
    pokemon: Pokemon = { id: 1, name: this.pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: this.sprites, stats: [], types: [], evolution: this.evolution, weight: 0.20, is_favorite: false }
    img = 'shiny';
}

describe('Testeo de Show Move Pokemon Sprite Directive', () => {
    let component: ShowPokemonShinySpriteMoveTestComponent;
    let fixture: ComponentFixture<ShowPokemonShinySpriteMoveTestComponent>;
    let input: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [ShowPokemonShinySpriteMoveTestComponent, ShowPokemonSpriteMoveDirective]
        });

        fixture = TestBed.createComponent(ShowPokemonShinySpriteMoveTestComponent);
        component = fixture.componentInstance;
    });

    it('Deberia mostrar el sprite shiny en movimiento para el evento mouseenter con url conteniendo shiny', () => {
        const debugEl = fixture.debugElement;

        input = debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement;

        fixture.detectChanges();

        // Creando el evento
        const mouseEnterEvent = new MouseEvent('mouseenter');

        // Generando el evento y detectandolo
        input.dispatchEvent(mouseEnterEvent);

        expect(debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement.src).toContain('shiny');
    });

    it('Deberia dejar mostrar el sprite shiny en movimiento para el evento mouseleave con url conteniendo shiny', () => {
        const debugEl = fixture.debugElement;

        input = debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement;

        fixture.detectChanges();

        // Creando el evento
        const mouseEnterEvent = new MouseEvent('mouseenter');

        // Generando el evento y detectandolo
        input.dispatchEvent(mouseEnterEvent);

        // Creando el evento
        const mouseLeaveEvent = new MouseEvent('mouseleave');

        // Generando el evento y detectandolo
        input.dispatchEvent(mouseLeaveEvent);

        expect(debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement.src).toContain('shiny');
    });

    it('Deberia mostrar el sprite normal en movimiento para el evento mouseenter con url conteniendo normal', () => {
        component.img = 'normal';
        const debugEl = fixture.debugElement;

        input = debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement;

        fixture.detectChanges();

        // Creando el evento
        const mouseEnterEvent = new MouseEvent('mouseenter');

        // Generando el evento y detectandolo
        input.dispatchEvent(mouseEnterEvent);

        expect(debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement.src).toContain('normal');
    });

    it('Deberia dejar mostrar el sprite normal en movimiento para el evento mouseleave con url conteniendo normal', () => {
        component.img = 'normal';
        const debugEl = fixture.debugElement;

        input = debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement;

        fixture.detectChanges();

        // Creando el evento
        const mouseEnterEvent = new MouseEvent('mouseenter');

        // Generando el evento y detectandolo
        input.dispatchEvent(mouseEnterEvent);

        // Creando el evento
        const mouseLeaveEvent = new MouseEvent('mouseleave');

        // Generando el evento y detectandolo
        input.dispatchEvent(mouseLeaveEvent);

        expect(debugEl.query(By.directive(ShowPokemonSpriteMoveDirective)).nativeElement.src).toContain('normal');
    });
});
