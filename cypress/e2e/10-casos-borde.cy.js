// Casos de prueba DE BORDE — TC-023, TC-024, TC-025 (plan de casos, Parte 1).
// Selectores verificados contra with-bugs.practicesoftwaretesting.com.
// Nota: deep-links dan 404, por eso la navegación arranca desde la home.
// Nota: el campo password de REGISTRO no tiene data-test (solo id="password").

describe('Casos de borde — TC-023 / TC-024 / TC-025', () => {
  // ─────────────────────────────────────────────────────────────
  // TC-023 — Contacto — Mensaje de contacto muy largo (>1000 chars)
  // Esperado: lo acepta correctamente o muestra límite claro;
  //           nunca trunca en silencio ni rompe.
  // Regla real del campo message: required + minLength(50), SIN maxLength
  //           y el <textarea> no tiene atributo maxlength.
  // ─────────────────────────────────────────────────────────────
  it('TC-023 — mensaje de contacto de más de 1000 caracteres', () => {
    cy.fixture('users').then((data) => {
      const form = data.contactForm;
      const longMsg = form.longMessage;

      // Sanity: el mensaje de prueba supera los 1000 caracteres
      expect(longMsg.length, 'el mensaje de prueba debe superar 1000 caracteres')
        .to.be.greaterThan(1000);

      cy.visit('/');
      cy.get('[data-test=nav-contact]').click();

      cy.get('[data-test=first-name]').type(form.firstName);
      cy.get('[data-test=last-name]').type(form.lastName);
      cy.get('[data-test=email]').type(form.email);
      cy.get('[data-test=subject]').type(form.subject);
      cy.get('[data-test=message]').type(longMsg, { delay: 0 });

      cy.get('[data-test=contact-submit]').click();

      // (a) NO trunca en silencio: el campo conserva el texto completo
      cy.get('[data-test=message]').should('have.value', longMsg);
      cy.get('[data-test=message]')
        .invoke('val')
        .its('length')
        .should('eq', longMsg.length);

      // (b) NO muestra error por largo (no hay regla maxLength → lo acepta)
      cy.get('body').then(($b) => {
        expect(
          $b.find('[data-test=message-error]:visible').length,
          'no debería aparecer error de validación por mensaje largo'
        ).to.eq(0);
      });

      // (c) NO rompe: el formulario y el botón siguen operables
      cy.get('[data-test=contact-submit]').should('exist');
      cy.get('[data-test=message]').should('be.enabled');

      cy.screenshot('tc-023-mensaje-largo');
    });
  });

  // ─────────────────────────────────────────────────────────────
  // TC-024 — Carrito — Cantidad 0 en el carrito
  // Precondición: producto agregado al carrito.
  // Esperado: error de validación o eliminación del ítem;
  //           nunca total inconsistente.
  // Comportamiento real del handler del carrito:
  //   if (value >= 0) { tope 10; replaceQuantity(id, value) }
  //   replaceQuantity(id, 0) → quantity=0, total=0*price=0, SIN eliminar el ítem.
  // ─────────────────────────────────────────────────────────────
  it('TC-024 — cambiar cantidad a 0 en el carrito', () => {
    // Precondición: un producto en el carrito
    cy.addFirstProductToCart();
    cy.get('[data-test=nav-cart]').click();
    cy.get('[data-test=cart-total]').should('be.visible');
    cy.get('[data-test=product-title]').should('exist');

    // Cambiar la cantidad a 0
    cy.get('[data-test=product-quantity]').first().clear().type('0').blur();

    // Comportamiento ESPERADO (correcto): error de validación o ítem eliminado.
    cy.get('body').then(($b) => {
      const itemRemoved = $b.find('[data-test=product-title]').length === 0;
      const cartGone = $b.find('[data-test=cart-total]').length === 0;
      const validationError =
        $b.find('[data-test=product-quantity]')
          .closest('td, .row, tr')
          .find('.text-danger, .alert-danger').length > 0 ||
        $b.find('.alert-danger').filter((_, el) =>
          /cantidad|quantity|m[íi]nim|invalid|mayor|menor/i.test(el.textContent)
        ).length > 0;
      const totalText = ($b.find('[data-test=cart-total]').text() || '').trim();
      const qtyValue = ($b.find('[data-test=product-quantity]').val() || '').toString();

      cy.log(`Cantidad resultante en el input: "${qtyValue}"`);
      cy.log(`Total del carrito tras fijar cantidad 0: "${totalText}"`);

      expect(
        itemRemoved || cartGone || validationError,
        'Cantidad 0 debería mostrar error de validación o eliminar el ítem ' +
        `(total consistente). Real: el ítem permanece con cantidad="${qtyValue}", ` +
        `sin error visible, total="${totalText}".`
      ).to.be.true;
    });

    cy.screenshot('tc-024-cantidad-0');
  });

  // ─────────────────────────────────────────────────────────────
  // TC-025 — Registro — Nombre de 1 solo carácter
  // Esperado: se acepta o se rechaza con mensaje claro según reglas del campo.
  // Regla real de first_name: required + pattern /^[a-zA-Z]+$/  (SIN minLength)
  //   → "A" cumple la regla → debería ACEPTARSE (sin error de first-name).
  // ─────────────────────────────────────────────────────────────
  it('TC-025 — first name = "A" con el resto válido', () => {
    cy.fixture('users').then((data) => {
      const r = data.registration;
      const uniqueEmail = `user${Date.now()}@test.com`; // DB compartida → email único

      cy.visit('/');
      cy.get('[data-test=nav-sign-in]').click();
      cy.contains('a', /register/i).click();

      cy.get('[data-test=first-name]').type('A');      // ← caso de borde: 1 carácter
      cy.get('[data-test=last-name]').type(r.lastName);
      cy.get('[data-test=dob]').type(r.dob);            // input type=text, formato YYYY-MM-DD
      cy.get('[data-test=address]').type(r.street);
      cy.get('[data-test=city]').type(r.city);
      cy.get('[data-test=state]').type(r.state);
      // country es un <select> cargado por API: elegir la primera opción real
      cy.get('[data-test=country]').find('option').should('have.length.greaterThan', 1);
      cy.get('[data-test=country]').select(1);
      cy.get('[data-test=postcode]').type(r.postalCode);
      cy.get('[data-test=phone]').type(r.phone);
      cy.get('[data-test=email]').type(uniqueEmail);
      cy.get('#password').type(r.password);             // registro: password SIN data-test

      cy.get('[data-test=register-submit]').click();

      // Regla del campo first_name no exige mínimo → "A" es válido → NO debe dar error.
      cy.get('body').then(($b) => {
        const firstNameError = $b.find('[data-test=first-name-error]:visible').length > 0;
        expect(
          firstNameError,
          'first-name="A" cumple la regla del campo (solo letras, sin mínimo) ' +
          '→ no debería mostrar error de validación'
        ).to.be.false;
      });

      // Capturar el resultado global (aceptación completa = redirect a /auth/login)
      cy.url().then((u) => cy.log('URL tras enviar el registro:', u));
      cy.screenshot('tc-025-nombre-1-char');
    });
  });
});
