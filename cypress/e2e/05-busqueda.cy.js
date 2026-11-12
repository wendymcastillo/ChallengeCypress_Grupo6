// Flujo 3.5 — Búsqueda de productos
describe('3.5 Búsqueda de productos', () => {
  it('busca una herramienta del catálogo y verifica los resultados', () => {
    // 1. Entrar a la página principal
    cy.visit('/');

    // 2. Tomar la primera palabra del nombre de un producto visible y buscarla
    cy.get('.card-title')
      .first()
      .invoke('text')
      .then((titulo) => {
        const palabra = titulo.trim().split(/\s+/)[0];

        cy.get('[data-test=search-query]').type(palabra);
        cy.get('[data-test=search-submit]').click();

        // 3. Verificar que aparecen resultados
        cy.get('a.card').should('have.length.at.least', 1);

        // 4. Verificar que el nombre de un resultado contiene lo buscado
        cy.get('.card-title').first().should(($el) => {
          expect($el.text().toLowerCase()).to.include(palabra.toLowerCase());
        });
      });
  });
});
