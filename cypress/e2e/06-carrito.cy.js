describe('Flujo 3.6: Eliminar un producto del carrito', () => {
  it('Debe vaciar el carrito al eliminar el producto', () => {
    cy.addFirstProductToCart();
    cy.get('[data-test="nav-cart"]').click();
    cy.get('.btn-danger').first().click();
    cy.get('.cart-empty').should('be.visible');
  });
});