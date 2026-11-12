// Flujo 3.1 — Compra exitosa
describe('3.1 Compra exitosa', () => {
  it('agrega un producto, inicia sesión y confirma la compra', () => {
    cy.fixture('users').then((data) => {
      // 1. Home muestra productos
      cy.visit('/');
      cy.get('a.card').should('have.length.at.least', 1);

      // 2. Abrir el primer producto y agregarlo al carrito
      cy.addFirstProductToCart();

      // 3. Verificar que el producto está en el carrito
      cy.get('[data-test=nav-cart]').click();
      cy.get('.btn.btn-danger').should('be.visible');
      cy.get('[data-test=cart-total]').should('be.visible');

      // 4. Iniciar sesión con el usuario de prueba (datos del fixture)
      cy.login(data.testUser.email, data.testUser.password);

      // 5. Avanzar por el checkout hasta confirmar
      cy.get('[data-test=nav-cart]').click();
      cy.get('[data-test=proceed-1]').click();
      cy.get('[data-test=proceed-2]').click();
      // Paso ADDRESS: proceed-3 queda disabled mientras el formulario sea inválido
      cy.get('#address').clear().type('Test street 98');
      cy.get('#city').clear().type('Vienna');
      cy.get('#state').clear().type('Vienna State');
      cy.get('#country').clear().type('Austria');
      cy.get('#postcode').clear().type('1010');
      cy.get('[data-test=proceed-3]').should('not.be.disabled').click();
      // Paso PAYMENT: método de pago en un <select> + datos de cuenta
      cy.get('select:visible').first().select(1);
      cy.get('input[placeholder*="Account name"]').type('Test User');
      cy.get('input[placeholder*="Account number"]').type('123456789');
      cy.get('[data-test=finish]').click();
      cy.get('[data-test=finish]').click();

      // 6. Verificar la confirmación de la compra
      cy.get('.alert-success, [data-test=payment-success-message]')
        .should('be.visible');
    });
  });
});
