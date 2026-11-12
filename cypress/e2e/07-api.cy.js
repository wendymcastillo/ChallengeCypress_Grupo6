describe('Flujo 3.7: Prueba de API', () => {
  it('Debe consultar la lista de productos y realizar login via API', () => {
    // Pedir lista de productos
    cy.request('GET', 'https://api-with-bugs.practicesoftwaretesting.com/products')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length.greaterThan(0);
      });

    // Login por API
    cy.fixture('users').then((userData) => {
      cy.request('POST', 'https://api-with-bugs.practicesoftwaretesting.com/users/login', {
        email: userData.validUser.email,
        password: userData.validUser.password
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('access_token');
      });
    });
  });
});