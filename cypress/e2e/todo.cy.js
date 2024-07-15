describe('Login', () => {

  beforeEach(() => {
      cy.visit('https://fipefacil.netlify.app/');
      cy.wait(2000);
      cy.get('body').should('be.visible');
      cy.clearAllCookies();
  });

  it('search car brand', () => {
      cy.get('#input-search').eq(0).type('toyota');
      cy.wait(1000);
      cy.get('#models-search-return').find('span').first().click();
      cy.wait(1000);
      cy.url().should('include', '/result');
      cy.wait(1000);
      cy.get('#result-container header span').should('contain', 'Toyota');
  });
});
