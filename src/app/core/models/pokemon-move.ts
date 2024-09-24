import { Generic } from "./generic";
import { PokemonMoveVersion } from "./pokemon-move-version";

export interface PokemonMove {
    move: Generic,
    type: Generic,
    version_group_details: PokemonMoveVersion[]
}