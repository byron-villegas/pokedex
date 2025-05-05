import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { MainComponent } from './main.component';

describe('Testeo de Main Component', () => {
  let injector: TestBed;
  let service: PokemonService;
  let httpMock: HttpTestingController;
  let input: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [
        MainComponent
      ],
      providers: [
        PokemonService
      ]
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(PokemonService);
    httpMock = injector.get(HttpTestingController);
  });

  it('Deberia crear el Main Component sin datos en el local storage', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    expect(component).toBeTruthy();
  });

  it('Deberia activar y desactivar el sprite shiny', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const debugEl = fixture.debugElement;
    input = debugEl.query(By.css('#shiny')).nativeElement;

    // Activar
    // Generando el evento
    input.click();

    // Detectando el evento
    fixture.detectChanges();

    // Desactivar
    // Generando el evento
    input.click();

    // Detectando el evento
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia activar y desactivar el dark theme', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const debugEl = fixture.debugElement;
    input = debugEl.query(By.css('#darkTheme')).nativeElement;

    // Activar
    // Generando el evento
    input.click();

    // Detectando el evento
    fixture.detectChanges();

    // Desactivar
    // Generando el evento
    input.click();

    // Detectando el evento
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia crear el Main Component con datos en el local storage', () => {
    const fixture = TestBed.createComponent(MainComponent);

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    service.saveTypeOnLocalStorage(type);

    const pokemonName = 'charmander';

    const pokedex = { id: 2, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    service.savePokedexOnLocalStorage(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const versionGroupDetail = { level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: 'kanto', url: '' } }
    const moves = [{ move: { name: 'firepunch', url: '1' }, type: undefined, version_group_details: [versionGroupDetail] }]
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: moves, species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    expect(component).toBeTruthy();
  });

  it('Deberia buscar un pokemon mediante la barra de busqueda', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const debugEl = fixture.debugElement;
    input = debugEl.query(By.css('#pokemonSearch')).nativeElement;

    // Creando el evento
    const keyboardEvent = new KeyboardEvent('keyup', { key: pokemonName });

    // Generando el evento y detectandolo
    input.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia anadir a favoritos un pokemon cargando los datos con local storage', () => {
    const fixture = TestBed.createComponent(MainComponent);


    const type = { count: 20, results: [] }

    service.saveTypeOnLocalStorage(type);

    const pokemonName = 'charmander';

    const pokedex = { id: 2, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    service.savePokedexOnLocalStorage(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chainZero = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites };
    const chainOne = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainZero], sprites: sprites };
    const chainTwo = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainOne], sprites: sprites };
    const chain = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainTwo], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const versionGroupDetail = { level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: 'kanto', url: '' } }
    const moves = [{ move: { name: 'firepunch', url: '1' }, type: undefined, version_group_details: [versionGroupDetail] }]
    const stats = [{ base_stat: 50, effort: 1, stat: { name: 'special-attack', url: '' } }, { base_stat: 50, effort: 1, stat: { name: 'special-defense', url: '' } }]
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: moves, species: { name: 'dragon', url: '' }, sprites: sprites, stats: stats, types: [], evolution: evolution, weight: 0.20 }

    const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '1' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

    service.savePokemonSpecieOnLocalStorage(pokemonSpecie);

    const pokemonMove = { move: { name: 'firepunch', url: '' }, type: { name: 'fire', url: '' }, version_group_details: [{ level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: '', url: '' } }] }

    service.savePokemonMoveOnLocalStorage(pokemonMove);

    const evolutionChain = { id: 1, chain }

    service.savePokemonEvolutionOnLocalStorage(evolutionChain);

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    fixture.detectChanges();

    const debugEl = fixture.debugElement;

    input = debugEl.query(By.css('#favorite-' + pokemonName)).nativeElement;

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia quitar de favoritos un pokemon cargando los datos con local storage', () => {
    const fixture = TestBed.createComponent(MainComponent);


    const type = { count: 20, results: [] }

    service.saveTypeOnLocalStorage(type);

    const pokemonName = 'charmander';

    const pokedex = { id: 2, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    service.savePokedexOnLocalStorage(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chainZero = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites };
    const chainOne = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainZero], sprites: sprites };
    const chainTwo = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainOne], sprites: sprites };
    const chain = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainTwo], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const versionGroupDetail = { level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: 'kanto', url: '' } }
    const moves = [{ move: { name: 'firepunch', url: '1' }, type: undefined, version_group_details: [versionGroupDetail] }]
    const stats = [{ base_stat: 50, effort: 1, stat: { name: 'special-attack', url: '' } }, { base_stat: 50, effort: 1, stat: { name: 'special-defense', url: '' } }]
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: moves, species: { name: 'dragon', url: '' }, sprites: sprites, stats: stats, types: [], evolution: evolution, weight: 0.20 }

    const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '1' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

    service.savePokemonSpecieOnLocalStorage(pokemonSpecie);

    const pokemonMove = { move: { name: 'firepunch', url: '' }, type: { name: 'fire', url: '' }, version_group_details: [{ level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: '', url: '' } }] }

    service.savePokemonMoveOnLocalStorage(pokemonMove);

    const evolutionChain = { id: 1, chain }

    service.savePokemonEvolutionOnLocalStorage(evolutionChain);

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    fixture.detectChanges();

    const debugEl = fixture.debugElement;

    input = debugEl.query(By.css('#favorite-' + pokemonName)).nativeElement;

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia seleccionar un pokemon buscado mediante la barra de busqueda cargando los datos con local storage', () => {
    const fixture = TestBed.createComponent(MainComponent);


    const type = { count: 20, results: [] }

    service.saveTypeOnLocalStorage(type);

    const pokemonName = 'charmander';

    const pokedex = { id: 2, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    service.savePokedexOnLocalStorage(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chainZero = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites };
    const chainOne = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainZero], sprites: sprites };
    const chainTwo = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainOne], sprites: sprites };
    const chain = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainTwo], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const versionGroupDetail = { level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: 'kanto', url: '' } }
    const moves = [{ move: { name: 'firepunch', url: '1' }, type: undefined, version_group_details: [versionGroupDetail] }]
    const stats = [{ base_stat: 50, effort: 1, stat: { name: 'special-attack', url: '' } }, { base_stat: 50, effort: 1, stat: { name: 'special-defense', url: '' } }]
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: moves, species: { name: 'dragon', url: '' }, sprites: sprites, stats: stats, types: [], evolution: evolution, weight: 0.20 }

    const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '1' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

    service.savePokemonSpecieOnLocalStorage(pokemonSpecie);

    const pokemonMove = { move: { name: 'firepunch', url: '' }, type: { name: 'fire', url: '' }, version_group_details: [{ level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: '', url: '' } }] }

    service.savePokemonMoveOnLocalStorage(pokemonMove);

    const evolutionChain = { id: 1, chain }

    service.savePokemonEvolutionOnLocalStorage(evolutionChain);

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const debugEl = fixture.debugElement;

    input = debugEl.query(By.css('#pokemonSearch')).nativeElement;

    // Creando el evento
    const keyboardEvent = new KeyboardEvent('keyup', { key: pokemonName });

    // Generando el evento y detectandolo
    input.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    input = debugEl.query(By.css('#avatar-' + pokemonName)).nativeElement;

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia seleccionar un pokemon buscado mediante la barra de busqueda cargando los datos con local storage y posteriormente generar el pdf', () => {
    const fixture = TestBed.createComponent(MainComponent);

    const type = { count: 20, results: [] }

    service.saveTypeOnLocalStorage(type);

    const pokemonName = 'charmander';

    const pokedex = { id: 2, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    service.savePokedexOnLocalStorage(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chainZero = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites };
    const chainOne = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainZero], sprites: sprites };
    const chainTwo = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainOne], sprites: sprites };
    const chain = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainTwo], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const versionGroupDetail = { level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: 'kanto', url: '' } }
    const moves = [{ move: { name: 'firepunch', url: '1' }, type: undefined, version_group_details: [versionGroupDetail] }]
    const stats = [{ base_stat: 50, effort: 1, stat: { name: 'special-attack', url: '' } }, { base_stat: 50, effort: 1, stat: { name: 'special-defense', url: '' } }]
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: moves, species: { name: 'dragon', url: '' }, sprites: sprites, stats: stats, types: [], evolution: evolution, weight: 0.20 }

    const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '1' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

    service.savePokemonSpecieOnLocalStorage(pokemonSpecie);

    const pokemonMove = { move: { name: 'firepunch', url: '' }, type: { name: 'fire', url: '' }, version_group_details: [{ level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: '', url: '' } }] }

    service.savePokemonMoveOnLocalStorage(pokemonMove);

    const evolutionChain = { id: 1, chain }

    service.savePokemonEvolutionOnLocalStorage(evolutionChain);

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const debugEl = fixture.debugElement;

    input = debugEl.query(By.css('#pokemonSearch')).nativeElement;

    // Creando el evento
    const keyboardEvent = new KeyboardEvent('keyup', { key: pokemonName });

    // Generando el evento y detectandolo
    input.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    input = debugEl.query(By.css('#avatar-' + pokemonName)).nativeElement;

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    input = debugEl.query(By.css('#generatePdf')).nativeElement;

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia seleccionar un pokemon buscado mediante la barra de busqueda cargando los datos con una sola evolucion sin el local storage', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');
    localStorage.removeItem('pokemonSpecies');
    localStorage.removeItem('pokemonMoves');
    localStorage.removeItem('pokemonEvolutions');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chainZero = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites };
    const chainOne = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainZero], sprites: sprites };
    const chain = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainOne], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const versionGroupDetail = { level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: 'kanto', url: '' } }
    const moves = [{ move: { name: 'firepunch', url: '1' }, type: undefined, version_group_details: [versionGroupDetail] }]
    const stats = [{ base_stat: 50, effort: 1, stat: { name: 'special-attack', url: '' } }, { base_stat: 50, effort: 1, stat: { name: 'special-defense', url: '' } }]
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: moves, species: { name: 'dragon', url: '' }, sprites: sprites, stats: stats, types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const debugEl = fixture.debugElement;

    input = debugEl.query(By.css('#pokemonSearch')).nativeElement;

    // Creando el evento
    const keyboardEvent = new KeyboardEvent('keyup', { key: pokemonName });

    // Generando el evento y detectandolo
    input.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    input = debugEl.query(By.css('#avatar-' + pokemonName)).nativeElement;

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '1' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemonSpecies}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemonSpecie);

    const move = { id: 1, name: 'firepunch', type: { name: 'fire', url: '' } }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.move}/${move.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(move);

    const evolutionChain = { id: 1, chain }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.evolution}/${evolutionChain.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(evolutionChain);

    expect(component).toBeTruthy();
  });

  it('Deberia seleccionar un pokemon buscado mediante la barra de busqueda cargando los datos con mas de dos evoluciones sin el local storage', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');
    localStorage.removeItem('pokemonSpecies');
    localStorage.removeItem('pokemonMoves');
    localStorage.removeItem('pokemonEvolutions');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: 2, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chainZero = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites };
    const chainOne = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainZero], sprites: sprites };
    const chain = { species: { name: 'charmander', url: '' }, evolution_details: [], evolves_to: [chainOne, chainOne], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const versionGroupDetail = { level_learned_at: 1, move_learn_method: { name: 'level-up', url: '' }, version_group: { name: 'kanto', url: '' } }
    const moves = [{ move: { name: 'firepunch', url: '1' }, type: undefined, version_group_details: [versionGroupDetail] }]
    const stats = [{ base_stat: 50, effort: 1, stat: { name: 'special-attack', url: '' } }, { base_stat: 50, effort: 1, stat: { name: 'special-defense', url: '' } }]
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: moves, species: { name: 'dragon', url: '' }, sprites: sprites, stats: stats, types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const debugEl = fixture.debugElement;

    input = debugEl.query(By.css('#pokemonSearch')).nativeElement;

    // Creando el evento
    const keyboardEvent = new KeyboardEvent('keyup', { key: pokemonName });

    // Generando el evento y detectandolo
    input.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    input = debugEl.query(By.css('#avatar-' + pokemonName)).nativeElement;

    // Generando el evento
    input.click();

    // detectando el evento
    fixture.detectChanges();

    const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '1' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemonSpecies}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemonSpecie);

    const move = { id: 1, name: 'firepunch', type: { name: 'fire', url: '' } }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.move}/${move.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(move);

    const evolutionChain = { id: 1, chain }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.evolution}/${evolutionChain.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(evolutionChain);

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar menor a mayor', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar menor a mayor con lista ya filtrada', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar mayor a menor', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar mayor a menor con lista ya filtrada', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar A a Z', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[3].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar A a Z con lista ya filtrada', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[3].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar Z a A', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[4].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar Z a A con lista ya filtrada', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[4].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar por favoritos sin favoritos', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20, is_favorite: false }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[5].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar por favoritos con favoritos', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20, is_favorite: true }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[5].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar por favoritos con favoritos con lista ya filtrada', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20, is_favorite: true }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;
    select.value = select.options[5].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar por defecto', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;

    // Seleccionamos primero un orden
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Reiniciamos el orden
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia ordenar por defecto con lista ya filtrada', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemon')).nativeElement;

    // Seleccionamos primero un orden
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Reiniciamos el orden
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia filtrar por tipo fuego', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [{ name: 'fire', url: '' }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemonByType')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia filtrar por tipo fuego con lista ya filtrada', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [{ name: 'fire', url: '' }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];

    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemonByType')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia filtrar por tipo fuego con lista ya filtrada vacia', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [{ name: 'fire', url: '' }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.originalPokemonList = [];
    component.searchText = 'asass';

    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemonByType')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia filtrar por tipo fuego y posteriormente restablecer el orden', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [{ name: 'fire', url: '' }, { name: 'water', url: '' }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemonByType')).nativeElement;

    // Seleccionamos primero un tipo
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Reiniciamos el filtro
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Deberia filtrar por tipo fuego y posteriormente restablecer el orden con texto en la busqueda', () => {
    const fixture = TestBed.createComponent(MainComponent);

    localStorage.removeItem('type');
    localStorage.removeItem('pokedex');

    const component = fixture.componentInstance;
    component.ngOnInit();

    let req;

    const type = { count: 20, results: [{ name: 'fire', url: '' }, { name: 'water', url: '' }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.type}`);
    expect(req.request.method).toBe('GET');
    req.flush(type);

    const pokemonName = 'charmander';

    const idPokedex = 2;
    const pokedex = { id: idPokedex, name: '', names: [], region: 'kanto', pokemon_entries: [{ entry_number: 1, pokemon_species: { name: pokemonName, url: '' } }] }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${idPokedex}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokedex);

    const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
    const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
    const evolution = { id: 1, chain: chain }
    const pokemon = { id: 1, name: pokemonName, order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20 }

    req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

    component.searchText = 'asass';

    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#orderPokemonByType')).nativeElement;

    // Seleccionamos primero un tipo
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Reiniciamos el filtro
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});