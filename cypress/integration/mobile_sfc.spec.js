///<reference types="cypress" />

describe('Mobile_Local', () => {

  it('Apontamento com Formulário de SFC "Usinagem"', () => {

    const configuracao = {} //esta customização está em commands
    cy.Config(configuracao) //esta customização está em commands

    const login = {}
    cy.Login(login)
    cy.intercept('POST', 'http://joisrvapldev001:8180/dts/man/resources/sync/rest?username=super&password=Super%40123&services=fch/fchman/fchmanproductionmobile&procedure=profile').as('postBuscaOP')
    cy.intercept('POST', '**/dts/man/resources/**').as('postBuscaOP')
    cy.contains('Usinagem').click()
    cy.get('html h2').should('contain', 'Usinagem')//assert
    cy.get('ion-button').should('contain', 'Procurar a OP')//assert
    cy.get('ion-content.md > ion-grid.md > :nth-child(1) > ion-col.md > .ng-untouched').click()
    cy.get('.action-sheet-container > :nth-child(1) > :nth-child(4)').click()
    cy.get('.ng-pristine > .native-input').type('888', { force: true })
    cy.get('.footer-md > ion-row.md > ion-col.md > .md').click()
    cy.wait('@postBuscaOP')
    cy.intercept('POST', '**/dts/man/resources/**').as('postApont')
    cy.get('html h2').should('contain', 'Atenção!')  // assert - ou usar assim: cy.get("#alert-8-hdr").should("contain", "Atenção!")
    cy.get(':nth-child(1) > .alert-button-inner').click()
    cy.get(':nth-child(7) > .ng-pristine > .native-input').type('ALM', { force: true }) //seleciona todo o campo quantidade
    cy.get('[ng-reflect-name=cod_local_sai]').type('{selectall}ALM')
    cy.get('ion-select-option').should('contain', '10/1/1 - Usinagem Inicial')//assert
    //cy.get(':nth-child(10) > .ng-pristine > .native-input').type('001')//Ferramenta
    cy.get(':nth-child(11) > .ion-no-padding > :nth-child(1) > .po-pl-0 > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('{selectall}30112021')
    cy.get(':nth-child(11) > .ion-no-padding > :nth-child(2) > .ng-pristine > .native-input').type('{selectall}0430')
    cy.get(':nth-child(12) > .ion-no-padding > :nth-child(1) > .po-pl-0 > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('{selectall}30112021')
    cy.get(':nth-child(12) > .ion-no-padding > :nth-child(2) > .ng-untouched > .native-input').type('{selectall}0630')
    cy.get(':nth-child(13) > .ion-no-padding > :nth-child(1) > .po-pl-0 > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('{selectall}30112021')
    cy.get(':nth-child(13) > .ion-no-padding > :nth-child(2) > .ng-untouched > .native-input').type('{selectall}0630')
    cy.get(':nth-child(14) > .ion-no-padding > :nth-child(1) > .po-pl-0 > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('{selectall}30112021')
    cy.get(':nth-child(14) > .ion-no-padding > :nth-child(2) > .ng-untouched > .native-input').type('{selectall}0830')
    cy.get('[ng-reflect-name=cod_depos]').type('{selectall}ACA') //seleciona todo o campo quantidade
    cy.get('[ng-reflect-name=cod_localiz]').type('{selectall}ACA') //seleciona todo o campo quantidade
    cy.get('[ng-reflect-name=lote_serie]').type('{selectall}Lote Cypress SFC 01')
    cy.get(':nth-child(18) > .po-p-0 > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('31122050', { force: true })
    cy.get(':nth-child(19) > .ng-untouched > .native-input').type('{selectall}0,5000')
    cy.get('app-datasul-report.ion-page > .footer-md > ion-row.md > :nth-child(2) > .md').click()
    cy.get('html h2').should('contain', 'Usinagem')// Assert
    cy.get('.po-toaster-message').should('contain', 'Apontamento efetuado com sucesso!')//Assert
    cy.get('.po-toaster-message').click()
    cy.get('app-datasul-report.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click()
    cy.wait('@postApont')

  })

})