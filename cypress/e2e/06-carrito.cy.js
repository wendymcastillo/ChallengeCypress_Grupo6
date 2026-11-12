// Flujo 3.6 — Eliminar un producto del carrito
describe('3.6 Eliminar producto del carrito', () => {
  it('agrega un producto, lo elimina y verifica que el carrito queda vacío', () => {
    // 1. Agregar el primer producto del catálogo al carrito
    cy.addFirstProductToCart();

    // 2. Ir al carrito y verificar que el producto está
    cy.get('[data-test=nav-cart]').click();
    cy.get('.btn.btn-danger').should('be.visible');
    cy.get('[data-test=cart-total]').should('be.visible');

    // 3. Eliminar el producto
    cy.get('.btn.btn-danger').first().click();

    // 4. Verificar que el carrito queda vacío
    cy.get('.btn.btn-danger').should('not.exist');
    cy.get('[data-test=cart-total]').should('not.exist');
  });
});
