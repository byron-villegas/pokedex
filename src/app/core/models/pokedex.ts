import { Name } from "./name";
import { PokemonEntry } from "./pokemon-entry";

export interface Pokedex {
    id: number,
    name: string,
    names: Name[],
    region: string
    pokemon_entries: PokemonEntry[],
}