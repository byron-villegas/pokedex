import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { environment } from 'src/environments/environment';

describe('PokemonService', () => {
  let injector: TestBed;
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    injector = getTestBed();
    service = injector.get(PokemonService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('savePokedexOnLocalStorage', () => {
    it('deberia guardar la pokedex en el local storage', () => {
      const pokedex = { id: 1, name: '', names: [], region: 'kanto', pokemon_entries: [] }

      service.savePokedexOnLocalStorage(pokedex);

      const req = service.getPokedexOfLocalStorage();
      expect(req).toEqual(pokedex);
    });
  });

  describe('savePokemonSpecieOnLocalStorage', () => {
    it('deberia guardar el pokemon specie en el local storage', () => {
      const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

      localStorage.removeItem('pokemonSpecies');
      service.savePokemonSpecieOnLocalStorage(pokemonSpecie);

      const req = service.getPokemonSpeciesOfLocalStorage();
      expect(req[0]).toEqual(pokemonSpecie);
    });
  });

  describe('savePokemonSpecieOnLocalStorage with exists pokemonSpecies', () => {
    it('deberia guardar aparte el pokemon specie en el local storage', () => {
      const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }
      const pokemonSpecie2 = { id: 2, name: 'charizard', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

      localStorage.removeItem('pokemonSpecies');

      service.savePokemonSpecieOnLocalStorage(pokemonSpecie);
      service.savePokemonSpecieOnLocalStorage(pokemonSpecie2);

      const req = service.getPokemonSpeciesOfLocalStorage();
      expect(req[1]).toEqual(pokemonSpecie2);
    });
  });

  describe('savePokemonMoveOnLocalStorage', () => {
    it('deberia guardar el pokemon move en el local storage', () => {

      const pokemonMove = { move: { name: '', url: '' }, type: { name: 'fire', url: '' }, version_group_details: [] }

      localStorage.removeItem('pokemonMoves');

      service.savePokemonMoveOnLocalStorage(pokemonMove);

      const req = service.getPokemonMovesOfLocalStorage();
      expect(req[0]).toEqual(pokemonMove);
    });
  });

  describe('savePokemonMoveOnLocalStorage with exists pokemonMove', () => {
    it('deberia guardar aparte el pokemon move en el local storage', () => {
      const pokemonMove = { move: { name: '', url: '' }, type: { name: 'fire', url: '' }, version_group_details: [] }
      const pokemonMove2 = { move: { name: '', url: '' }, type: { name: 'water', url: '' }, version_group_details: [] }

      localStorage.removeItem('pokemonMoves');

      service.savePokemonMoveOnLocalStorage(pokemonMove);
      service.savePokemonMoveOnLocalStorage(pokemonMove2);

      const req = service.getPokemonMovesOfLocalStorage();
      expect(req[1]).toEqual(pokemonMove2);
    });
  });

  describe('savePokemonEvolutionOnLocalStorage', () => {
    it('deberia guardar el pokemon evolution en el local storage', () => {
      const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
      const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
      const evolution = { id: 1, chain: chain }

      localStorage.removeItem('pokemonEvolutions');

      service.savePokemonEvolutionOnLocalStorage(evolution);

      const req = service.getPokemonEvolutionsOfLocalStorage();
      expect(req[0]).toEqual(evolution);
    });
  });

  describe('savePokemonEvolutionOnLocalStorage with exists pokemonEvolution', () => {
    it('deberia guardar aparte el pokemon evolution en el local storage', () => {
      const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
      const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
      const evolution = { id: 1, chain: chain }
      const evolution2 = { id: 2, chain: chain }

      localStorage.removeItem('pokemonEvolutions');

      service.savePokemonEvolutionOnLocalStorage(evolution);
      service.savePokemonEvolutionOnLocalStorage(evolution2);

      const req = service.getPokemonEvolutionsOfLocalStorage();
      expect(req[1]).toEqual(evolution2);
    });
  });


  describe('findPokedexById', () => {
    it('deberia retornar Observable<Pokedex>', () => {
      const id = 1;
      const pokedex = { id: 1, name: '', names: [], region: 'kanto', pokemon_entries: [] }

      service.findPokedexById(id).subscribe(resp => {
        expect(resp).toEqual(pokedex);
      });

      const req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokedex}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(pokedex);
    });
  });

  describe('findGenerationById', () => {
    it('deberia retornar Observable<Generation>', () => {
      const id = 1;
      const generation = { id: 1, name: '1', main_region: { name: 'kanto', url: '' }, moves: [], names: [], pokemon_species: [], types: [], version_groups: [] }

      service.findGenerationById(id).subscribe(resp => {
        expect(resp).toEqual(generation);
      });

      const req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.generation}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(generation);
    });
  });

  describe('findPokemonByIdOrName', () => {
    it('deberia retornar Observable<Pokemon>', () => {
      const value = '1';
      const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
      const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
      const evolution = { id: 1, chain: chain }
      const pokemon = { id: 1, name: 'charmander', order: 4, height: 0.30, abilities: [], is_default: true, location_area_encounters: 'kanto', moves: [], species: { name: 'dragon', url: '' }, sprites: sprites, stats: [], types: [], evolution: evolution, weight: 0.20, is_favorite: false }

      service.findPokemonByIdOrName(value).subscribe(resp => {
        expect(resp).toEqual(pokemon);
      });

      const req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemon}/${value}`);
      expect(req.request.method).toBe('GET');
      req.flush(pokemon);
    });
  });

  describe('findPokemonSpecieByIdOrName', () => {
    it('deberia retornar Observable<PokemonSpecie>', () => {
      const value = '1';
      const pokemonSpecie = { id: 1, name: 'charmander', names: [], color: { name: '', url: '' }, gender_rate: 1, genera: [], generation: { name: '', url: '' }, habitat: { name: '', url: '' }, order: 4, has_gender_differences: true, base_happiness: 1, evolution_chain: { name: '', url: '' }, evolves_from_species: { name: '', url: '' }, pokedex_numbers: [] }

      service.findPokemonSpecieByIdOrName(value).subscribe(resp => {
        expect(resp).toEqual(pokemonSpecie);
      });

      const req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.pokemonSpecies}/${value}`);
      expect(req.request.method).toBe('GET');
      req.flush(pokemonSpecie);
    });
  });

  describe('findPokemonEvolutionById', () => {
    it('deberia retornar Observable<EvolutionChain>', () => {
      const id = 1;
      const sprites = { back_default: '', back_female: '', back_shiny: '', back_shiny_female: '', front_default: '', front_default_move: '', front_female: '', front_shiny: '', front_shiny_move: '', front_shiny_female: '', other: { "official-artwork": { front_default: '', front_shiny: '' } } }
      const chain = { species: { name: '', url: '' }, evolution_details: [], evolves_to: [], sprites: sprites }
      const evolutionChain = { id: 1, chain }

      service.findPokemonEvolutionById(id).subscribe(resp => {
        expect(resp).toEqual(evolutionChain);
      });

      const req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.evolution}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(evolutionChain);
    });
  });

  describe('findMoveById', () => {
    it('deberia retornar Observable<Move>', () => {
      const id = 1;
      const move = { id: 1, name: '', type: { name: '', url: '' } }

      service.findMoveById(id).subscribe(resp => {
        expect(resp).toEqual(move);
      });

      const req = httpMock.expectOne(`${environment.server.url}/${environment.server.paths.move}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(move);
    });
  });
});