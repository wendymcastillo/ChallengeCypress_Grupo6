describe('Flujo 3.3: Formulario de contacto', () => {
  beforeEach(function () {
    cy.fixture('users').as('userData');
  });

  it('Debe enviar el mensaje de contacto correctamente', function () {
    cy.visit('/#/contact');
    const contact = this.userData.contactData;

    cy.get('[data-test="first-name"]').type(contact.name);
    cy.get('[data-test="last-name"]').type(contact.lastname);
    cy.get('[data-test="email"]').type(contact.email);
    cy.get('[data-test="subject"]').select(contact.subject);
    cy.get('[data-test="message"]').type(contact.message);
    cy.get('[data-test="contact-submit"]').click();

    cy.get('.alert-success').should('be.visible');
  });
});