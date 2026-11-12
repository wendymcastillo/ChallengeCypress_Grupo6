// Flujo 3.3 — Formulario de contacto
describe('3.3 Formulario de contacto', () => {
  it('envía un mensaje válido y muestra la confirmación', () => {
    cy.fixture('users').then((data) => {
      const form = data.contactForm;

      // 1. Ir a la página de contacto (navegando desde la home: el servidor da 404 en deep-links)
      cy.visit('/');
      cy.get('[data-test=nav-contact]').click();

      // 2. Completar todos los campos con datos válidos del fixture
      cy.get('[data-test=first-name]').type(form.firstName);
      cy.get('[data-test=last-name]').type(form.lastName);
      cy.get('[data-test=email]').type(form.email);
      cy.get('[data-test=subject]').type(form.subject);
      cy.get('[data-test=message]').type(form.message);

      // 3. Enviar el mensaje
      cy.get('[data-test=contact-submit]').click();

      // 4. Verificar la confirmación
      cy.get('.alert-success').should('be.visible');
    });
  });

  // TC-020 — Negativo: email sin formato en contacto
  it('TC-020 — email inválido (abc@) muestra error de validación y no envía', () => {
    cy.fixture('users').then((data) => {
      const form = data.contactForm;

      // Cualquier POST a la API significaría que el mensaje se envió
      cy.intercept('POST', 'https://api-with-bugs.practicesoftwaretesting.com/**').as('apiPost');

      cy.visit('/');
      cy.get('[data-test=nav-contact]').click();

      cy.get('[data-test=first-name]').type(form.firstName);
      cy.get('[data-test=last-name]').type(form.lastName);
      cy.get('[data-test=email]').type('abc@'); // sin formato
      cy.get('[data-test=subject]').type(form.subject);
      cy.get('[data-test=message]').type(form.message);

      cy.get('[data-test=contact-submit]').click();

      // 1. Error de validación visible en el campo email
      //    (texto real del sitio with-bugs: "Email format is invalid")
      cy.get('[data-test=email-error]')
        .should('be.visible')
        .and('contain.text', 'Email format is invalid');

      // 2. El mensaje no se envía: sin confirmación y sin POST a la API
      cy.get('.alert-success').should('not.exist');
      cy.wait(2000); // ventana para detectar un envío que no debería ocurrir
      cy.get('@apiPost.all').should('have.length', 0);
    });
  });
});
