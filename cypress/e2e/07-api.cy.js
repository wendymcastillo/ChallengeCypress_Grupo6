// Flujo 3.7 — Prueba de API (cy.request, sin abrir la página)
describe('3.7 Prueba de API', () => {
  it('consulta productos y autentica por API', () => {
    cy.fixture('users').then((data) => {
      const api = data.api.baseUrl;

      // 1. Lista de productos: status 200 y lista no vacía
      cy.request('GET', `${api}/products`).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('array').with.length.at.least(1);
      });

      // 2. Login por API: status 200 y token de acceso
      cy.request('POST', `${api}/users/login`, {
        email: data.testUser.email,
        password: data.testUser.password,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('access_token');
        expect(res.body.access_token).to.be.a('string').and.not.be.empty;
      });
    });
  });
});
