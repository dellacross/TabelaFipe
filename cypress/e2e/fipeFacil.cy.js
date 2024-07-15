describe('Search car brand', () => {

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

describe('Car Comparison Flow', () => {

  beforeEach(() => {
      cy.visit('https://fipefacil.netlify.app/');
      cy.wait(2000);
      cy.get('body').should('be.visible');
      cy.clearAllCookies();
  });

  it('navigate to compare page and select vehicles', () => {
    cy.get('#mobile-nav-btn').click();
    cy.wait(1000);
    cy.get('#nav-mobile main button').contains('Comparar').click();
    cy.url().should('include', '/compare');
    
    for (let i = 0; i < 3; i++) {
      cy.get('aside nav button').first().click();
      cy.wait(1000);
    }

    cy.get('#vehicle-switch-checkbox').then(($checkbox) => {
      if (!$checkbox.is(':checked')) {
        cy.get('.vehicle-switch').click();
      }
    });

    for (let i = 0; i < 3; i++) {
      cy.get('aside nav button').first().click();
      cy.wait(1000);
    }
  });
});

describe('See Model Details', () => {

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
      cy.wait(1000);
      cy.get('input[placeholder="Digite o nome do modelo"]').type('etios');
      cy.wait(1000);
      cy.contains('ETIOS 1.3 Flex 16V 5p Mec.').click();
      cy.wait(1000);
      cy.url().should('include', '/modelo');
      cy.contains('Valor FIPE:').should('be.visible');
      cy.contains('Valor IPVA:').should('be.visible');
      cy.contains('Código FIPE:').should('be.visible');
      cy.contains('Mês de Referência:').should('be.visible');
  });
});

describe('Login Details', () => {

  beforeEach(() => {
      cy.visit('https://fipefacil.netlify.app/');
      cy.wait(2000);
      cy.get('body').should('be.visible');
      cy.clearAllCookies();
  });

  it('navigate to compare page and select vehicles', () => {
      cy.get('#mobile-nav-btn').click();
      cy.wait(1000);
      cy.get('#nav-mobile main button').contains('Entrar ou cadastrar').click();
      cy.url().should('include', '/perfil');
      //cy.contains('Login').should('be.visible');
      //cy.contains('Usuário').should('be.visible');
      //cy.contains('Senha').should('be.visible');
      //cy.contains('Entrar').should('be.visible');
      //cy.contains('Ainda não tem uma conta?').should('be.visible');
  });
});

describe('Register Details', () => {

  beforeEach(() => {
      cy.visit('https://fipefacil.netlify.app/');
      cy.wait(2000);
      cy.get('body').should('be.visible');
      cy.clearAllCookies();
  });

  it('navigate to compare page and select vehicles', () => {
      cy.get('#mobile-nav-btn').click();
      cy.wait(1000);
      cy.get('#nav-mobile main button').contains('Entrar ou cadastrar').click();
      cy.url().should('include', '/perfil');
      //cy.contains('Nome').should('be.visible');
      //cy.contains('E-mail').should('be.visible');
      //cy.contains('Senha').should('be.visible');
      //cy.contains('Repita a senha').should('be.visible');
      //cy.contains('Selecione o estado desejado').should('be.visible');
      //cy.contains('Registrar').should('be.visible'); 
  });
});