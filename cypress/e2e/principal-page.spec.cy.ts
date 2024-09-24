describe('Entrar en la pagina principal', () => {
  it('Validar que el titulo sea Pokedex', () => {
    cy.visit('/pokedex');
    cy.wait(2000);
    cy.title().should('eq', 'Pokedex');
    cy.wait(2000);
  });
});