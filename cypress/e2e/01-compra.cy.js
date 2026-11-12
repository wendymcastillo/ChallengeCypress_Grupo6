describe('Flujo 3.1: Compra exitosa', () => {
  beforeEach(function () {
    cy.fixture('users').as('userData');
  });

  it('Debe completar el flujo de compra correctamente', function () {
    // Entrar y agregar producto
    cy.addFirstProductToCart();
    
    // Ir al carrito y verificar
    cy.get('[data-test="nav-cart"]').click();
    cy.get('.product-title').should('be.visible');
    
    // Iniciar sesión en el checkout o estar logueado
    cy.get('[data-test="proceed-1"]').click();
    cy.get('[data-test="email"]').type(this.userData.validUser.email);
    cy.get('[data-test="password"]').type(this.userData.validUser.password);
    cy.get('[data-test="login-submit"]').click();

   // Avanzar al formulario de dirección
    cy.get('[data-test="proceed-2"]').click();
    
    // 2. Llenar el país como un campo de texto normal
    cy.get('[data-test="country"]')
      .should('be.visible')
      .clear()
      .type('El Salvador');

    // 3. Llenar el campo State
    cy.get('[data-test="state"]')
      .should('be.visible')
      .clear()
      .type('Cabañas');

    // 4. Llenar el Código Postal
    cy.get('[data-test="postcode"]')
      .should('be.visible')
      .clear()
      .type('1101');

    // 5. Avanzar al paso de pago
    cy.get('[data-test="proceed-3"]').click({ force: true });

    // 6. Seleccionar el método de pago
    cy.get('[data-test="payment-method"]').select('Cash on Delivery', { force: true });
    
    // 7. Rellenar los datos de la cuenta y confirmar
    cy.get('[data-test="account-name"]').type('Mi Cuenta de Pruebas');
    cy.get('[data-test="account-number"]').type('123456789');
    cy.get('.btn-success').contains('Confirm').click();

    // 8. Verificar éxito
    cy.get('.alert-success').should('be.visible');


  

  

  

    
 
  });
});