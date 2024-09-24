describe('Utilizar la barra de busqueda de pokemon con caracteres extranos', () => {
    it('Validar que al escribir caracteres extranos solo reciba caracteres normales', () => {
        cy.visit('/pokedex');
        cy.wait(2000);
        cy.get('[type="search"]').type('+a+c+b').should('have.value', 'acb');
        cy.wait(2000);
    });
    it('Validar que al pegar caracteres extranos solo reciba caracteres normales', () => {
        cy.visit('/pokedex');
        cy.wait(2000);
        cy.get('[type="search"]').paste('+a+c+b').should('have.value', 'acb');
        cy.wait(2000);
    });
});