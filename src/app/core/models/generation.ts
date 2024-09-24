import { Generic } from "./generic";
import { Name } from "./name";

export interface Generation {
    id: number,
    name: string,
    main_region: Generic,
    moves: Generic[],
    names: Name[],
    pokemon_species: Generic[],
    types: Generic[],
    version_groups: Generic[]
}