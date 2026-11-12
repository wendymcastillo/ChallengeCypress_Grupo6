// Flujo 3.4 — Inicio de sesión con datos incorrectos
describe('3.4 Login con datos incorrectos', () => {
  it('muestra error con contraseña equivocada y no inicia sesión', () => {
    cy.fixture('users').then((data) => {
      // 1. Ir a la página de inicio de sesión (desde la home: deep-links dan 404)
      cy.visit('/');
      cy.get('[data-test=nav-sign-in]').click();

      // 2. Email del usuario de prueba + contraseña equivocada (del fixture)
      cy.get('[data-test=email]').type(data.testUser.email);
      cy.get('[data-test=password]').type(data.wrongPassword);

      // 3. Enviar el formulario
      cy.get('[data-test=login-submit]').click();

      // 4. Verificar el mensaje de error
      cy.get('[data-test=login-error]').should('be.visible');

      // 5. Verificar que no se inició sesión: seguimos en la página de login
      cy.url().should('include', '/auth/login');
      cy.get('[data-test=nav-sign-out]').should('not.exist');
    });
  });
});
