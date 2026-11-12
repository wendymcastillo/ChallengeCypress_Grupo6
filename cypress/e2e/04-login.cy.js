describe('Flujo 3.4: Inicio de sesión', () => {
  beforeEach(function () {
    cy.fixture('users').as('userData');
  });

  it('iniciar sesión', function () {
    // Navegar a la página principal (si no está en el beforeEach)
    cy.visit('/'); // o la ruta correspondiente

    // hacer clic en el sign in del menu superior
    cy.get('[data-test="nav-sign-in"]').click(); 
    cy.get('[data-test="email"]').type(this.userData.validUser.email);
    cy.get('[data-test="password"]').type(this.userData.validUser.password);
    cy.get('[data-test="login-submit"]').click();

  });
});
