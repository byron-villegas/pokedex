describe('Ordenar listado de pokemones', () => {
    it('Ordenar Menor a Mayor', () => {
        const pokemonName = 'Bulbasaur';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="ordenarPokemon"]').select('Ordenar Menor a Mayor').should('have.value', '1');
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemonName.toLocaleLowerCase());
        cy.wait(2000);
    });

    it('Ordenar Mayor a Menor', () => {
        const pokemonName = 'Charizard';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="ordenarPokemon"]').select('Ordenar Mayor a Menor').should('have.value', '2');
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemonName.toLocaleLowerCase());
        cy.wait(2000);
    });

    it('Ordenar A - Z', () => {
        const pokemonName = 'Bulbasaur';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="ordenarPokemon"]').select('Ordenar A - Z').should('have.value', '3');
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemonName.toLocaleLowerCase());
        cy.wait(2000);
    });

    it('Ordenar Z - A', () => {
        const pokemonName = 'Venusaur';

        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="ordenarPokemon"]').select('Ordenar Z - A').should('have.value', '4');
        cy.wait(2000);
        cy.get('[id="pokemons"').children().should('have.id', 'pokemon-' + pokemonName.toLocaleLowerCase());
        cy.wait(2000);
    });
});