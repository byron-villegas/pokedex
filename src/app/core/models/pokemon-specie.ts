import { Generic } from "./generic";
import { Genus } from "./genus";
import { Name } from "./name";
import { Pokedex } from "./pokedex";

export interface PokemonSpecie {
    id: number,
    name: string,
    names: Name[],
    color: Generic,
    gender_rate: number,
    genera: Genus[],
    generation: Generic,
    habitat: Generic,
    order: number,
    has_gender_differences: boolean,
    base_happiness: number,
    evolution_chain: Generic,
    evolves_from_species: Generic,
    pokedex_numbers: Pokedex[]
}