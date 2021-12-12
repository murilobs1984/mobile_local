// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }


Cypress.Commands.add('Config', () =>{

  cy.intercept('GET', 'http://localhost:8000/index.html').as('getConfig')
  cy.visit('http://localhost:8000/index.html')
  cy.get('.swiper-slide-active > .card-div > .card-title').click()
  cy.get('.swiper-slide-active > .card-div > .card-title').click()
  cy.get('.card-subtitle > .ion-color').click()
  cy.get('ion-row.md > :nth-child(2) > .md').click()
  cy.get('app-config.ion-page > .footer-md > ion-grid.md > ion-row.md > ion-col.md > .md').click()
  cy.get(':nth-child(1) > :nth-child(1) > .ng-untouched').click()
  cy.get(':nth-child(2) > .ng-untouched > .item-radio-checked > .in-item').click()
  cy.get(':nth-child(2) > ion-col.md > .ng-pristine').click()
  cy.get('.action-sheet-selected').click()
  cy.get(':nth-child(3) > ion-col.md > .ng-untouched > .native-input').type('joisrvapldev001', { force: true })
  cy.get(':nth-child(4) > ion-col.md > .ng-untouched > .native-input').type('8180', { force: true })
  cy.get('app-config.ion-page > .footer-md > ion-grid.md > ion-row.md > :nth-child(1)').click()
  cy.wait('@getConfig').its('response.statusCode').should('eq', 200)
})


Cypress.Commands.add('Login', () => {

  const usuario = 'super' //variável
  const senha = 'Super@123'     //variável
  cy.intercept('POST', 'http://joisrvapldev001:8180/dts/man/resources/man/login?username=super&password=Super%40123').as('postLogar')
  cy.get('[placeholder="Seu usuário"]').type(usuario)
  cy.get('[placeholder="Sua senha"]').type((senha), { log: false })
  cy.contains('button', 'Entrar').click()
  cy.wait('@postLogar').its('response.statusCode').should('eq', 200)

})
