///<reference types="cypress" />

describe('Mobile_Local', () => {

  //Esta parte foi customuzada em commands
  /*
  it('Configuração Inicial de tecnologia', () => {
    cy.intercept('GET', 'http://localhost:8000/index.html').as('getConfig')
    cy.visit('http://localhost:8000/index.html')
    cy.get('.swiper-slide-active > .card-div > .card-title').click()
    cy.get('.swiper-slide-active > .card-div > .card-title').click()
    cy.get('.card-subtitle > .ion-color').click()
    cy.get('ion-row.md > :nth-child(2) > .md').click()
    cy.get('app-config.ion-page > .footer-md > ion-grid.md > ion-row.md > ion-col.md > .md').click()
    cy.get(':nth-child(1) > :nth-child(1) > .ng-untouched').click()
    //cy.get("#ion-rb-6").check();
    cy.get(':nth-child(2) > .ng-untouched > .item-radio-checked > .in-item').click()
    cy.get(':nth-child(2) > ion-col.md > .ng-pristine').click()
    cy.get('.action-sheet-selected').click()
    cy.get(':nth-child(3) > ion-col.md > .ng-untouched > .native-input').type('joisrvapldev001', { force: true })
    cy.get(':nth-child(4) > ion-col.md > .ng-untouched > .native-input').type('8180', { force: true })
    cy.get('app-config.ion-page > .footer-md > ion-grid.md > ion-row.md > :nth-child(1)').click()
    cy.wait('@getConfig').its('response.statusCode').should('eq', 200)

  })

  it('Logar no Sistema', () => {
    const configuracao = {}
    cy.ConfeLogin(configuracao)

    const usuario = 'super' //variável
    const senha = 'Super@123'     //variável
    cy.intercept('POST', 'http://joisrvapldev001:8180/dts/man/resources/man/login?username=super&password=Super%40123').as('postLogar')
    cy.get('[placeholder="Seu usuário"]').type(usuario)
    cy.get('[placeholder="Sua senha"]').type((senha), { log: false })
    cy.contains('button', 'Entrar').click()
    cy.wait('@postLogar').its('response.statusCode').should('eq', 200)

  })
*/

  it('Apontamento com Formulário de PCP "Montagem"', () => {

    const configuracao = {} //esta customização está em commands
    cy.Config(configuracao) //esta customização está em commands

    const login = {}
    cy.Login(login)

    cy.intercept('POST', 'http://joisrvapldev001:8180/dts/man/resources/sync/rest?username=super&password=Super%40123&services=fch/fchman/fchmanproductionmobile&procedure=profile').as('postBuscaOP')
    cy.contains('Montagem').click()
    cy.get('html h2').should('contain', 'Montagem')
    cy.get('.ng-pristine > .native-input').type(871)
    cy.get('.footer-md > ion-row.md > ion-col.md > .md').click()
    cy.wait('@postBuscaOP')
    cy.intercept('POST', 'http://joisrvapldev001:8180/dts/man/resources/sync/rest?username=super&password=Super%40123&services=fch/fchman/fchmanproductionmobile&procedure=buscaDadosOrdem').as('postReporta')
    cy.get('[ng-reflect-name=cod_depos_sai]').type('{selectall}ALM') //seleciona todo o campo quantidade
    cy.get('[ng-reflect-name=cod_local_sai]').type('{selectall}ALM') //seleciona todo o campo quantidade
    cy.get('[ng-reflect-name=cod_depos]').type('{selectall}ACA') //seleciona todo o campo quantidade
    cy.get('[ng-reflect-name=cod_localiz]').type('{selectall}ACA') //seleciona todo o campo quantidade
    cy.get(':nth-child(12) > .ng-untouched > .native-input').type('{selectall}0,5000') //seleciona todo o campo quantidade
    cy.get('.footer-md > ion-row.md > :nth-child(2) > .md').click()
    cy.get('html h2').should('contain', 'Montagem')
    cy.wait('@postReporta').its('response.statusCode').should('eq', 200)
    cy.get('.po-toaster-message').should('contain', 'Apontamento efetuado com sucesso!')
    cy.get('.po-toaster-message').click()
    cy.get('app-datasul-report.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click()

  })

})