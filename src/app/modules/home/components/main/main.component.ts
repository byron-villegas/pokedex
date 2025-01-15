import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { Chain } from 'src/app/core/models/chain';
import { Generic } from 'src/app/core/models/generic';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonMove } from 'src/app/core/models/pokemon-move';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  originalPokemonList: Pokemon[] = [];
  types: Generic[] = [];
  pokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | undefined = undefined;
  shinyActivated: boolean = false;
  darkThemeActivated: boolean = true;
  searchText: string = '';
  order: string = '';
  typeOrder: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    if (this.pokemonService.getTypeOfLocalStorage()) {
      this.types = this.pokemonService.getTypeOfLocalStorage().results;
    }
    else {
      this.pokemonService.findTypes().subscribe(type => {
        this.types = type.results;
        this.pokemonService.saveTypeOnLocalStorage(type);
      });
    }

    const loadPokemons = new Promise<void>((resolve) => {
      if (this.pokemonService.getPokedexOfLocalStorage()) {
        const pokedex = this.pokemonService.getPokedexOfLocalStorage();
        pokedex.pokemon_entries.length = environment.pokemonAmount;
    
        const requests = pokedex.pokemon_entries.map(pokemonEntry => 
          this.pokemonService.findPokemonByIdOrName(pokemonEntry.pokemon_species.name).toPromise()
        );
    
        Promise.all(requests).then(pokemons => {
          pokemons.forEach(pokemon => {
            const idPokemon = pokemon.id.toString().padStart(3, '0');
            pokemon.sprites.front_default_move = `assets/img/sprites/${idPokemon}_sprite_front_default_move.png`;
            pokemon.sprites.front_shiny_move = `assets/img/sprites/${idPokemon}_sprite_front_shiny_move.png`;
    
            this.originalPokemonList.push(pokemon);
            this.pokemons.push(pokemon);
          });
          resolve();
        });
      } else {
        this.pokemonService.findPokedexById(2).subscribe(pokedex => {
          pokedex.pokemon_entries.length = environment.pokemonAmount;
          this.pokemonService.savePokedexOnLocalStorage(pokedex);
    
          const requests = pokedex.pokemon_entries.map(pokemonEntry => 
            this.pokemonService.findPokemonByIdOrName(pokemonEntry.pokemon_species.name).toPromise()
          );
    
          Promise.all(requests).then(pokemons => {
            pokemons.forEach(pokemon => {
              const idPokemon = pokemon.id.toString().padStart(3, '0');
              pokemon.sprites.front_default_move = `assets/img/sprites/${idPokemon}_sprite_front_default_move.png`;
              pokemon.sprites.front_shiny_move = `assets/img/sprites/${idPokemon}_sprite_front_shiny_move.png`;
    
              this.originalPokemonList.push(pokemon);
              this.pokemons.push(pokemon);
            });
            resolve();
          });
        });
      }
    });
    
    loadPokemons.then(() => {
      this.resetPokemonsOrder();
    });
  }

  resetPokemonsOrder(): void {
    this.pokemons = this.originalPokemonList.sort((x, y) => x.id - y.id);
  }

  onSearchPokemon(event: KeyboardEvent) {
    const element = (event.target as HTMLInputElement);
    this.searchText = element.value;

    if (this.searchText.length == 0 && (this.typeOrder == '' || this.typeOrder == 'reset') && (this.order == '' || this.order == 'reset')) {
      this.resetPokemonsOrder();
    }

    if (this.pokemons.length == this.originalPokemonList.length) {
      this.pokemons = this.originalPokemonList.filter(pokemon => pokemon.name.includes(this.searchText));
    }
    else {
      if (this.typeOrder == '' || this.typeOrder == 'reset') {
        this.pokemons = this.originalPokemonList.filter(pokemon => pokemon.name.includes(this.searchText));
      }
      else {
        this.pokemons = this.originalPokemonList.filter(pokemon => pokemon.name.includes(this.searchText) && pokemon.types.filter(type => type.type.name.includes(this.typeOrder)).length > 0);
      }
    }
  }

  onOrderPokemon(event: Event) {
    const element = (event.target as HTMLInputElement);
    this.order = element.value;

    switch (element.value) {
      case '1':
        if (this.pokemons.length == this.originalPokemonList.length) {
          this.resetPokemonsOrder();
        }
        else {
          this.pokemons = this.pokemons.sort((x, y) => x.id - y.id);
        }
        break;
      case '2':
        if (this.pokemons.length == this.originalPokemonList.length) {
          this.pokemons = this.originalPokemonList.sort((x, y) => y.id - x.id);
        }
        else {
          this.pokemons = this.pokemons.sort((x, y) => y.id - x.id);
        }
        break;
      case '3':
        if (this.pokemons.length == this.originalPokemonList.length) {
          this.pokemons = this.originalPokemonList.sort((x, y) => x.name > y.name ? 1 : -1);
        }
        else {
          this.pokemons = this.pokemons.sort((x, y) => x.name > y.name ? 1 : -1);
        }
        break;
      case '4':
        if (this.pokemons.length == this.originalPokemonList.length) {
          this.pokemons = this.originalPokemonList.sort((x, y) => y.name > x.name ? 1 : -1);
        }
        else {
          this.pokemons = this.pokemons.sort((x, y) => y.name > x.name ? 1 : -1);
        }
        break;
      case '5':
        if (this.pokemons.length == this.originalPokemonList.length) {
          this.pokemons = this.originalPokemonList.sort((x, y) => y.is_favorite == true ? 1 : -1);
        }
        else {
          this.pokemons = this.pokemons.sort((x, y) => y.is_favorite == true ? 1 : -1);
        }
        break;
      case 'reset':
        if (this.searchText.length > 0 || this.pokemons.length != this.originalPokemonList.length) {
          break;
        }
        this.resetPokemonsOrder();
        break;
    }
  }

  onOrderPokemonByType(event: Event) {
    const element = (event.target as HTMLInputElement);
    this.typeOrder = element.value;

    if (element.value == 'reset') {
      if (this.searchText.length > 0) {
        this.pokemons = this.originalPokemonList.filter(pokemon => pokemon.name.includes(this.searchText));
        return;
      }
      
      this.resetPokemonsOrder();
      return;
    }

    if (this.pokemons.length == this.originalPokemonList.length) {
      this.pokemons = this.originalPokemonList.filter(pokemon => pokemon.types.filter(type => type.type.name.includes(element.value)).length > 0);
    }
    else {
      if ((this.pokemons.length == 0 || this.pokemons.length > 0) && this.searchText.length > 0)
        this.pokemons = this.originalPokemonList.filter(pokemon => pokemon.name.includes(this.searchText) && pokemon.types.filter(type => type.type.name.includes(element.value)).length > 0);
      else
        this.pokemons = this.originalPokemonList.filter(pokemon => pokemon.types.filter(type => type.type.name.includes(element.value)).length > 0);
    }
  }

  activateOrDesactivateDarkTheme() {
    if (this.darkThemeActivated) {
      document.body.classList.remove('dark-mode');
      this.darkThemeActivated = false;
    }
    else {
      document.body.classList.add('dark-mode');
      this.darkThemeActivated = true;
    }
  }

  activateOrDesactivateShiny() {
    if (this.shinyActivated) {
      this.shinyActivated = false;
    }
    else {
      this.shinyActivated = true;
    }
  }

  showPokemon(value: string) {
    this.selectedPokemon = this.pokemons.find(pokemon => pokemon.name == value);
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.loadPokemonSpecie();
  }

  addOrRemoveFavorite(pokemon: Pokemon): void {
    if (pokemon.is_favorite) {
      this.pokemons[this.pokemons.indexOf(pokemon)].is_favorite = false;
      this.originalPokemonList[this.originalPokemonList.indexOf(pokemon)].is_favorite = false;
      pokemon.is_favorite = false;
    }
    else {
      this.pokemons[this.pokemons.indexOf(pokemon)].is_favorite = true;
      this.originalPokemonList[this.originalPokemonList.indexOf(pokemon)].is_favorite = true;
      pokemon.is_favorite = true;
    }
  }

  loadPokemonSpecie(): void {
    if (this.pokemonService.getPokemonSpeciesOfLocalStorage()) {
      let specie = this.pokemonService.getPokemonSpeciesOfLocalStorage().find(pokemon => pokemon.name == this.selectedPokemon!.name);

      if (specie) {
        let value = specie!.evolution_chain.url.replace('https://pokeapi.co/api/v2/evolution-chain/', '').replace('/', '');
        let id = parseInt(value);

        this.loadPokemonStats();
        this.loadPokemonMoves();
        this.loadPokemonEvolution(id);
        return;
      }
    }

    this.pokemonService.findPokemonSpecieByIdOrName(this.selectedPokemon!.name).subscribe(pokemonSpecie => {

      this.pokemonService.savePokemonSpecieOnLocalStorage(pokemonSpecie);

      let value = pokemonSpecie.evolution_chain.url.replace('https://pokeapi.co/api/v2/evolution-chain/', '').replace('/', '');
      let id = parseInt(value);

      this.loadPokemonStats();
      this.loadPokemonMoves();
      this.loadPokemonEvolution(id);
    });
  }

  loadPokemonStats(): void {
    this.selectedPokemon!.stats = this.selectedPokemon!.stats.map(stat => {
      stat.stat.name = stat.stat.name.replace('special-attack', 'Sp. Atk.').replace('special-defense', 'Sp. Def.');
      return stat;
    });
  }

  loadPokemonMoves(): void {
    this.selectedPokemon!.moves = this.selectedPokemon!.moves.filter(move => move.version_group_details.find(group => group.move_learn_method.name == 'level-up')?.move_learn_method.name == 'level-up');

    if (!this.selectedPokemon!.moves[0].type) {

      let moves: PokemonMove[] = [];

      this.selectedPokemon!.moves.forEach((move, index) => {
        let value = move.move.url.replace('https://pokeapi.co/api/v2/move/', '').replace('/', '');
        let id = parseInt(value);

        if (this.pokemonService.getPokemonMovesOfLocalStorage()) {
          let pokemonMove = this.pokemonService.getPokemonMovesOfLocalStorage().find(pokemonMove => pokemonMove.move.name == move.move.name);

          if (pokemonMove) {
            move.type = pokemonMove!.type;
            moves.push(move);

            if ((index + 1) == this.selectedPokemon!.moves.length) {
              this.selectedPokemon!.moves = moves;
            }
            return;
          }
        }
        this.pokemonService.findMoveById(id).subscribe(resp => {
          move.type = resp.type;
          moves.push(move);

          this.pokemonService.savePokemonMoveOnLocalStorage(move);

          if ((index + 1) == this.selectedPokemon!.moves.length) {
            this.selectedPokemon!.moves = moves;
          }
        });
      });
    }
  }

  loadPokemonEvolution(id: number): void {
    if (this.pokemonService.getPokemonEvolutionsOfLocalStorage()) {
      let evolution = this.pokemonService.getPokemonEvolutionsOfLocalStorage().find(pokemonEvolution => pokemonEvolution.id == id);

      if (evolution) {
        this.selectedPokemon!.evolution = evolution!;
        this.loadPokemonEvolutions();
        return;
      }
    }
    this.pokemonService.findPokemonEvolutionById(id).subscribe(evolution => {
      this.selectedPokemon!.evolution = evolution;
      this.pokemonService.savePokemonEvolutionOnLocalStorage(evolution);

      this.loadPokemonEvolutions();
    });
  }

  loadPokemonEvolutions(): void {
    if (this.selectedPokemon?.evolution.chain) {
      let pokemon = this.originalPokemonList.find(pokemon => pokemon.name == this.selectedPokemon!.evolution.chain.species.name);
      if (pokemon) {
        this.selectedPokemon!.evolution.chain.sprites = pokemon.sprites;
      }
    }

    if (this.selectedPokemon?.evolution.chain && this.selectedPokemon?.evolution.chain.evolves_to.length == 1) {
      let pokemon = this.originalPokemonList.find(pokemon => pokemon.name == this.selectedPokemon!.evolution.chain.evolves_to[0].species.name);

      if (pokemon) {
        this.selectedPokemon!.evolution.chain.evolves_to[0].sprites = pokemon.sprites;
      }

      if (this.selectedPokemon?.evolution.chain.evolves_to[0] && this.selectedPokemon?.evolution.chain.evolves_to[0].evolves_to[0]) {
        let pokemon = this.originalPokemonList.find(pokemon => pokemon.name == this.selectedPokemon!.evolution.chain.evolves_to[0].evolves_to[0].species.name);
        if (pokemon) {
          this.selectedPokemon!.evolution.chain.evolves_to[0].evolves_to[0].sprites = pokemon.sprites;
        }
      }
    }

    if (this.selectedPokemon?.evolution.chain && this.selectedPokemon?.evolution.chain.evolves_to.length > 1) {

      let evolutions: Chain[] = [];

      this.selectedPokemon?.evolution.chain.evolves_to.map(evolution => {
        let pokemon = this.originalPokemonList.find(pokemon => pokemon.name == evolution.species.name);
        if (pokemon) {
          evolution.sprites = pokemon.sprites;
          evolutions.push(evolution);
        }
      });
      this.selectedPokemon!.evolution.chain.evolves_to = evolutions;
    }
  }

  generatePdf(): void {
    const fileName = `${this.selectedPokemon!.name.substring(0, 1).toUpperCase() + this.selectedPokemon!.name.substring(1, this.selectedPokemon!.name.length).toLowerCase()}.pdf`;
    const data = document.getElementById('selectPokemonContent')!;
    const doc = new jsPDF();
    const options = {
      background: 'white',
      scale: 3,
      useCORS: true
    };
    html2canvas(data, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((pdfDocument) => {
      pdfDocument.save(fileName);
    });
  }
}