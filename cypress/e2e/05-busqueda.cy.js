describe('Flujo 5: Búsqueda y filtrado de productos', () => {
  it('Buscar un producto y aplicar el filtro de categoría', () => {
    cy.visit('/');

    cy.get('[data-test="category-3"]').check();
    cy.get('[data-test="eco-badge"]').should('be.visible');
  });
});