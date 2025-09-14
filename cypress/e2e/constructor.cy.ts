interface ICreateOrderRequest {
  ingredients: string[];
}

interface ICreateOrderResponse {
  success: boolean;
  order: {
    number: number;
  };
}

interface IInterceptedOrder {
  request: {
    body: ICreateOrderRequest;
    headers: Record<string, string>;
    method: string;
    url: string;
  };
  response: {
    body: ICreateOrderResponse;
    statusCode: number;
    headers: Record<string, string>;
  };
}

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of null (reading 'document')")) {
    return false; // Cypress не упадёт
  }
});

describe('Stellar-burgers e2e', function() {
beforeEach(() => {
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
afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
})
  it('should display correct ingredient details in the modal', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa093c"').find('a').click();
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="modal-details"]').should('have.text', 'Детали ингредиента')
      cy.get('[data-cy="modal-details-img"]')
  .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-02-large.png');
      cy.get('[data-cy="modal-details-h3"]').should('have.text', 'Краторная булка N-200i');
      cy.get('[data-cy="modal-details-calories"]').should('have.text', '420');
      cy.get('[data-cy="modal-details-proteins"]').should('have.text', '80');
      cy.get('[data-cy="modal-details-fat"]').should('have.text', '24');
      cy.get('[data-cy="modal-details-carbohydrates"]').should('have.text', '53');
    });
  it('should open ingredient modal and close it by clicking the "X" button',() => { 
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"').find('a').click();
    cy.get('[data-cy="modal-close"]').click();
  }),
  it('should open ingredient modal and close it by clicking on the overlay',() => { 
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"').find('a').click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    })
  it('should create an order with selected ingredients and reset the constructor after closing modal', () => {
        cy.fixture('order.json').then((order) => {
      cy.intercept('POST', '/api/orders', {
        statusCode: 200,
        body: order
      }).as('createOrder');
    });
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"').find('button').click();
    cy.get('[data-cy="643d69a5c3f7b9001cfa0945"').find('button').click();
    cy.get('.button_type_primary').click();
    cy.wait('@createOrder').then((intercept: IInterceptedOrder) => {
        const request = intercept.request.body as ICreateOrderRequest;
        const response = intercept.response.body as ICreateOrderResponse;
      expect(request.ingredients).to.have.length(3);
      cy.log('Sent ingredients: ' + JSON.stringify(request.ingredients));
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="modalOrder"]').should('have.text', 1);
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
    it('Ingredient is added to burger constructor when clicking on its card', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa093c"').find('button').click();
      cy.get('[data-cy="643d69a5c3f7b9001cfa0945"').find('button').click();
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
      cy.get('*').filter((index, el) => el.innerText === 'Соус с шипами Антарианского плоскоходца')
  .should('have.length', 2);
    })
});



