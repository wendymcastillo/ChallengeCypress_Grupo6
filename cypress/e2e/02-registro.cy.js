// Flujo 3.2 — Validaciones del formulario de registro
describe('3.2 Validaciones del registro', () => {
  it('muestra errores al enviar el formulario vacío y no crea cuenta', () => {
    // 1. Ir a la página de registro (navegando desde la home: el servidor da 404 en deep-links)
    cy.visit('/');
    cy.get('[data-test=nav-sign-in]').click();
    cy.contains('a', /register/i).click();

    // 2. Enviar sin completar ningún campo
    cy.get('[data-test=register-submit]').click();

    // 3. Verificar los mensajes de error de los campos obligatorios clave
    ['first-name', 'last-name', 'email', 'password'].forEach((campo) => {
      cy.get(`[data-test=${campo}-error]`).should('be.visible');
    });

    // 4. Verificar que no se creó ninguna cuenta: seguimos en la página de registro
    cy.url().should('include', '/auth/register');
    cy.get('[data-test=nav-sign-out]').should('not.exist');
  });
});
