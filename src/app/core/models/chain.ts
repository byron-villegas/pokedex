import { Generic } from "./generic";
import { PokemonSprite } from "./pokemon-sprite";

export interface Chain {
    species: Generic,
    evolution_details: string[],
    evolves_to: Chain[],
    sprites: PokemonSprite
}