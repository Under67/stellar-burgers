interface ICreateOrderRequest {
  ingredients: string[];
}

interface ICreateOrderResponse {
  success: boolean;
  order: {
    number: number;
  };
}

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of null (reading 'document')")) {
    return false; // Cypress не упадёт
  }
});

describe('Stellar-burgers e2e', function() {
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', {
        statusCode: 200,
        body: ingredients
      }).as('getIngredients');
    });

    cy.fixture('user.json').then((user) => {
      cy.intercept('GET', '/api/auth/user', {
        statusCode: 200,
        body: user
      }).as('getUser');
    });

    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.setCookie('accessToken', 'accessToken');

    cy.visit('/');
    cy.wait('@getUser');
    cy.wait('@getIngredients');
})
  it('open modal => close to click "x"  ',() => { 
    cy.get('li').first().find('a').click();
    cy.get('[data-cy="modal-close"]').click();
  }),
  it('open modal => close to click overlay  ',() => { 
    cy.get('li').first().find('a').click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    })
  it('order', () => {
    cy.intercept
    cy.get('li').first().find('button').click();
    cy.get('li').last().find('button').click();
    cy.fixture('order.json').then((order) => {
      cy.intercept('POST', '/api/orders', {
        statusCode: 200,
        body: order
      }).as('createOrder');
    });
    cy.get('.button_type_primary').click();
    cy.wait('@createOrder').then((interception: any) => {
      const request = interception.request?.body as ICreateOrderRequest;
      const response = interception.response?.body as ICreateOrderResponse;
      expect(request.ingredients).to.have.length(3);
      cy.log('Sent ingredients: ' + JSON.stringify(request.ingredients));
      cy.get('[data-cy="modal"]').should('exist');
      expect(response).to.have.property('success', true);
      expect(response.order.number).to.equal(1);
      cy.log('Order response: ' + JSON.stringify(response));
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="oneBun"]').should('have.text', 'Выберите булки')
      cy.get('[data-cy="twoBun"]').should('have.text', 'Выберите булки')
      cy.get('[data-cy="filling"]').should('have.text', 'Выберите начинку')
      
    });
  })
});



