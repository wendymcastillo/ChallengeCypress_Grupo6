describe('Flujo 3.2: Validaciones del formulario de registro', () => {
  it('Debe mostrar errores al enviar el formulario vacío', () => {
    cy.visit('/#/auth/register');
    cy.get('[data-test="register-submit"]').click();

    // Validar mensajes de error obligatorios
    cy.get('.alert-danger').should('be.visible');
    cy.url().should('include', '/auth/register');
  });
});