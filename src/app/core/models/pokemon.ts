import { EvolutionChain } from "./evolution-chain";
import { Generic } from "./generic";
import { PokemonAbility } from "./pokemon-ability";
import { PokemonMove } from "./pokemon-move";
import { PokemonSprite } from "./pokemon-sprite";
import { PokemonStat } from "./pokemon-stat";
import { PokemonType } from "./pokemon-type";

export interface Pokemon {
    id: number,
    name: string,
    order: number,
    height: number,
    abilities: PokemonAbility[],
    is_default: boolean,
    location_area_encounters: string,
    moves: PokemonMove[],
    species: Generic,
    sprites: PokemonSprite,
    stats: PokemonStat[],
    types: PokemonType[],
    evolution: EvolutionChain,
    weight: number,
    is_favorite: boolean
}