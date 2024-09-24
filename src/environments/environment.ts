export const environment = {
  production: false,
  server: {
    url: 'https://pokeapi.co/api/v2',
    paths: {
      generation: 'generation',
      type: 'type',
      pokedex: 'pokedex',
      pokemon: 'pokemon',
      pokemonSpecies: 'pokemon-species',
      evolution: 'evolution-chain',
      move: 'move'
    }
  },
  pokemonAmount: /Headless/.test(window.navigator.userAgent) ? 1 : window.navigator.userAgent.includes('Robot Chromium') ? 6 : 151
};