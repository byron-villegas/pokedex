describe('Buscar un pokemon en la barra de busqueda de pokemon', () => {
    it('Validar que se filtre el pokemon buscado', () => {
        const pokemonName = 'Charmander';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[type="search"]').type(pokemonName.toLocaleLowerCase() + '{alt}');
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemonName.toLocaleLowerCase());
        cy.wait(2000);
    });

    it('Validar que sea seleccionado el pokemon buscado', () => {
        const types = ['Fire'];
        const abilities = ['Blaze', 'Solar-power'];
        const stats = ['Hp: 39', 'Attack: 52', 'Defense: 43', 'Sp. Atk.: 60', 'Sp. Def.: 50', 'Speed: 65']
        const moves = ['Leer', 'Scratch'];
        const pokemon = { name: 'Charmander', types: types, abilities: abilities, stats: stats, moves: moves };

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[type="search"]').type(pokemon.name.toLocaleLowerCase() + '{alt}');
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemon.name.toLocaleLowerCase());
        cy.wait(2000);
        cy.get('[id="pokemons"').children().find('img').click();
        cy.wait(2000);
        cy.get('[id="selectedPokemonModal"').should('have.class', 'modal fade show');
        cy.wait(2000);
        cy.get('[id="selectedPokemonModalLabel"').should('have.text', pokemon.name);
        cy.wait(2000);

        // Se valida por la cantidad de tipos
        pokemon.types.forEach((type, index) => {
            cy.get('[id="selectedPokemonModal"').get('[class="modal-dialog"]').get('[class="modal-content"]').get('[class="modal-body"]').get('[class="row row-cols-sm-3"]').children().eq(1).get('[class="row"]').children().eq(index).should('have.text', type);
            cy.wait(2000);
        });

        // Se valida por la cantidad de habilidades
        pokemon.abilities.forEach((ability, index) => {
            cy.get('[id="selectedPokemonModal"').get('[class="modal-dialog"]').get('[class="modal-content"]').get('[class="modal-body"]').get('[class="row row-cols-sm-3"]').children().eq(2).children().eq(1).children().eq(index).should('have.text', ability);
            cy.wait(2000);
        });

        // Se valida por los stats
        pokemon.stats.forEach((stat, index) => {
            cy.get('[id="selectedPokemonModal"').get('[class="modal-dialog"]').get('[class="modal-content"]').get('[class="modal-body"]').children().eq(1).children().eq(0).children().eq(1).children().eq(index).children().eq(0).contains(stat);
            cy.wait(2000);
        });

        // Se valida que contenga los movimientos
        pokemon.moves.forEach((move) => {
            cy.get('[id="selectedPokemonModal"').get('[class="modal-dialog"]').get('[class="modal-content"]').get('[class="modal-body"]').children().eq(1).children().eq(1).children().contains(move);
            cy.wait(2000);
        })

    });
});