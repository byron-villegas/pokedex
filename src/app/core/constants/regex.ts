export const Regex = {
    PRICE_REPLACE: /\B(?=(\d{3})+(?!\d))/g,
    ONLY_NORMAL_CHARACTERS: /^[a-zA-Z0-9 ñáéíóúÑÁÉÍÓÚ]*$/g,
    ONLY_NORMAL_CHARACTERS_REPLACE: /[^a-zA-Z0-9 ñáéíóúÑÁÉÍÓÚ]/g
}