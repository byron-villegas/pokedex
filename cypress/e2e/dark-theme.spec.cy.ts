describe('Activar el Dark Theme', () => {
  it('Validar que se active el Dark Theme', () => {
    cy.visit('/pokedex');
    cy.wait(2000);
    cy.get('[id="darkTheme"]').click();
    cy.wait(2000);
    cy.get('body').should('have.class', 'dark-mode');
    cy.wait(2000);
  });
});

describe('Desactivar el Dark Theme', () => {
  it('Validar que se desactive el Dark Theme', () => {
    cy.visit('/pokedex');
    cy.wait(2000);
    cy.get('[id="darkTheme"]').click();
    cy.wait(2000);
    cy.get('[id="darkTheme"]').click();
    cy.wait(2000);
    cy.get('body').should('have.class', '');
    cy.wait(2000);
  });
});