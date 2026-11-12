// Custom commands del proyecto (mínimo 2 exigidos por el reto).
// Selectores verificados contra with-bugs.practicesoftwaretesting.com (v5.0).
// Nota: el servidor no soporta deep-links (404 en /auth/login directo),
// por eso la navegación siempre arranca desde la home.

// Inicia sesión por UI navegando desde la home y verifica la sesión activa.
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.get('[data-test=nav-sign-in]').click();
  cy.get('[data-test=email]').type(email);
  cy.get('[data-test=password]').type(password);
  cy.get('[data-test=login-submit]').click();
  // nav-sign-out vive dentro de un dropdown colapsado (a.dropdown-item oculto):
  // la sesión se valida con la desaparición del link de sign-in.
  cy.get('[data-test=nav-sign-in]').should('not.exist');
});

// Entra al primer producto del catálogo y lo agrega al carrito.
// La home a veces no renderiza el grid de productos (bug intermitente):
// si no hay cards, se recarga una vez antes de fallar.
Cypress.Commands.add('addFirstProductToCart', () => {
  cy.visit('/');
  cy.get('body').then(($body) => {
    if ($body.find('a.card').length === 0) {
      cy.reload();
    }
  });
  cy.get('a.card', { timeout: 30000 }).first().click();
  cy.get('[data-test=add-to-cart]').click();
});
