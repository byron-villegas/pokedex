import { OfficialArtwork } from "./official-artwork"

export interface PokemonSprite {
    back_default: string,
    back_female: string,
    back_shiny: string,
    back_shiny_female: string,
    front_default: string,
    front_default_move: string,
    front_female: string,
    front_shiny: string,
    front_shiny_move: string,
    front_shiny_female: string,
    other: {
        "official-artwork": OfficialArtwork
    }
}