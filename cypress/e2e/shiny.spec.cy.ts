describe('Activar el Sprite Shiny', () => {
    it('Validar que se active el Sprite Shiny', () => {
        cy.visit('/pokedex');
        cy.wait(2000);
        cy.get('[id="shiny"]').click();
        cy.wait(2000);
        cy.get('[id="shiny"]').should('have.class', 'fa fa-2x ms-1 cursor-pointer fa-star yellow');
        cy.wait(2000);
    });
    it('Validar que se active el Sprite Shiny en el primer pokemon', () => {
        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="shiny"]').click();
        cy.wait(2000);
        cy.get('[id="shiny"]').should('have.class', 'fa fa-2x ms-1 cursor-pointer fa-star yellow');
        cy.wait(2000);
        cy.get('[id="pokemons"').children().find('img').should('have.attr', 'src').should('include', 'shiny');
        cy.wait(2000);
    });
});

describe('Desactivar el Sprite Shiny', () => {
    it('Validar que se desactive el Sprite Shiny', () => {
        cy.visit('/pokedex');
        cy.wait(2000);
        cy.get('[id="shiny"]').click();
        cy.wait(2000);
        cy.get('[id="shiny"]').click();
        cy.wait(2000);
        cy.get('[id="shiny"]').should('have.class', 'fa fa-2x ms-1 cursor-pointer fa-star-o');
        cy.wait(2000);
    });

    it('Validar que se desactive el Sprite Shiny en el primer pokemon', () => {
        cy.visit('/pokedex');
        cy.wait(5000);
        cy.get('[id="shiny"]').click();
        cy.wait(2000);
        cy.get('[id="shiny"]').should('have.class', 'fa fa-2x ms-1 cursor-pointer fa-star yellow');
        cy.wait(2000);
        cy.get('[id="shiny"]').click();
        cy.wait(2000);
        cy.get('[id="pokemons"').children().find('img').should('have.attr', 'src').should('not.include', 'shiny');
        cy.wait(2000);
    });
});