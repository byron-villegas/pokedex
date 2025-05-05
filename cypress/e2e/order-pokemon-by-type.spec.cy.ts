describe('Ordenar listado de pokemones por tipo', () => {
    it('Ordenar por tipo fuego', () => {
        const pokemonName = 'Charmander';
        const type = 'Fire';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="orderPokemon"]').select('Ordenar Menor a Mayor').should('have.value', '1');
        cy.wait(2000);
        cy.get('[id="orderPokemonByType"]').select(type).should('have.value', type.toLocaleLowerCase());
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemonName.toLocaleLowerCase());
        cy.wait(2000);
    });

    it('Ordenar por tipo planta', () => {
        const pokemonName = 'Bulbasaur';
        const type = 'Grass';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="orderPokemon"]').select('Ordenar Menor a Mayor').should('have.value', '1');
        cy.wait(2000);
        cy.get('[id="orderPokemonByType"]').select(type).should('have.value', type.toLocaleLowerCase());
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemonName.toLocaleLowerCase());
        cy.wait(2000);
    });

    it('Ordenar por tipo desconocido', () => {
        const type = 'Unknown';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="orderPokemon"]').select('Ordenar Menor a Mayor').should('have.value', '1');
        cy.wait(2000);
        cy.get('[id="orderPokemonByType"]').select(type).should('have.value', type.toLocaleLowerCase());
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('not.exist');
        cy.wait(2000);
    });
});