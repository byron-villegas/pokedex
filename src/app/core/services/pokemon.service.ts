import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvolutionChain } from '../models/evolution-chain';
import { Generation } from '../models/generation';
import { Move } from '../models/move';
import { Pokedex } from '../models/pokedex';
import { Pokemon } from '../models/pokemon';
import { PokemonMove } from '../models/pokemon-move';
import { PokemonSpecie } from '../models/pokemon-specie';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  saveTypeOnLocalStorage(type: Type) {
    localStorage.setItem('type', JSON.stringify(type));
  }

  getTypeOfLocalStorage(): Type {
    return JSON.parse(localStorage.getItem('type')!);
  }

  savePokedexOnLocalStorage(pokedex: Pokedex) {
    localStorage.setItem('pokedex', JSON.stringify(pokedex));
  }

  getPokedexOfLocalStorage(): Pokedex {
    return JSON.parse(localStorage.getItem('pokedex')!);
  }

  savePokemonSpecieOnLocalStorage(pokemonSpecie: PokemonSpecie) {
    let pokemonSpecies = this.getPokemonSpeciesOfLocalStorage();

    if(pokemonSpecies) {
      let specie = pokemonSpecies.find(pokemon => pokemon.name == pokemonSpecie.name);

      if(!specie) {
        pokemonSpecies.push(pokemonSpecie);
      }
    }
    else {
      pokemonSpecies = [];
      pokemonSpecies.push(pokemonSpecie);
    }

    localStorage.setItem('pokemonSpecies', JSON.stringify(pokemonSpecies));
  }

  getPokemonSpeciesOfLocalStorage(): PokemonSpecie[] {
    return JSON.parse(localStorage.getItem('pokemonSpecies')!);
  }

  savePokemonMoveOnLocalStorage(pokemonMove: PokemonMove) {
    let pokemonMoves = this.getPokemonMovesOfLocalStorage();

    if(pokemonMoves) {
      let move = pokemonMoves.find(move => move.move.name == pokemonMove.move.name && !move.type);

      if(!move) {
        pokemonMoves.push(pokemonMove);
      }
    }
    else {
      pokemonMoves = [];
      pokemonMoves.push(pokemonMove);
    }

    localStorage.setItem('pokemonMoves', JSON.stringify(pokemonMoves));
  }

  getPokemonMovesOfLocalStorage(): PokemonMove[] {
    return JSON.parse(localStorage.getItem('pokemonMoves')!);
  }

  savePokemonEvolutionOnLocalStorage(pokemonEvolution: EvolutionChain) {
    let pokemonEvolutions = this.getPokemonEvolutionsOfLocalStorage();

    if(pokemonEvolutions) {
      let evolution = pokemonEvolutions.find(evol => evol.id == pokemonEvolution.id);
      if(!evolution) {
        pokemonEvolutions.push(pokemonEvolution);
      }
    }
    else {
      pokemonEvolutions = [];
      pokemonEvolutions.push(pokemonEvolution);
    }

    localStorage.setItem('pokemonEvolutions', JSON.stringify(pokemonEvolutions));
  }

  getPokemonEvolutionsOfLocalStorage(): EvolutionChain[] {
    return JSON.parse(localStorage.getItem('pokemonEvolutions')!);
  }

  findGenerationById(id: number): Observable<Generation> {
    return this.http.get<Generation>(`${environment.server.url}/${environment.server.paths.generation}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findTypes(): Observable<Type> {
    return this.http.get<Type>(`${environment.server.url}/${environment.server.paths.type}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findPokedexById(id: number): Observable<Pokedex> {
    return this.http.get<Pokedex>(`${environment.server.url}/${environment.server.paths.pokedex}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findPokemonByIdOrName(value: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.server.url}/${environment.server.paths.pokemon}/${value}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findPokemonSpecieByIdOrName(value: string): Observable<PokemonSpecie> {
    return this.http.get<PokemonSpecie>(`${environment.server.url}/${environment.server.paths.pokemonSpecies}/${value}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findPokemonEvolutionById(id: number): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(`${environment.server.url}/${environment.server.paths.evolution}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findMoveById(id: number): Observable<Move> {
    return this.http.get<Move>(`${environment.server.url}/${environment.server.paths.move}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}