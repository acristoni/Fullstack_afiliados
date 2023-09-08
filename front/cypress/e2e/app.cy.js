describe('Gestão de pedidos', () => {
    it('Deve criar um cliente novo', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#ButtonNewClient').click();
        cy.get('input[name="first_name"]').type('Isabelle')
        cy.get('input[name="last_name"]').type('Gomes')
        cy.get('input[name="document"]').type('01997531135')
        cy.get('input[name="email"]').type('isabelle_gomes@esctech.com.br')
        cy.get('input[name="phone_number"]').type('5127540444')
        cy.get('input[name="password"]').type('Hn1iMlY6jc')
        cy.get('#ButtonSave').click();
        cy.get('#ButtonClose').click();

        cy.get('input[name="first_name"]').clear()
        cy.get('input[name="last_name"]').clear()
        cy.get('input[name="document"]').clear()
        cy.get('input[name="email"]').clear()
        cy.get('input[name="phone_number"]').clear()
        cy.get('input[name="password"]').clear()

        cy.get('input[name="first_name"]').type('Thales')
        cy.get('input[name="last_name"]').type('Silva')
        cy.get('input[name="document"]').type('98878786187')
        cy.get('input[name="email"]').type('thalesrobertojesus@lagencemodelos.com.br')
        cy.get('input[name="phone_number"]').type('8437076029')
        cy.get('input[name="password"]').type('el8ERLlTZX')
        cy.get('#ButtonSave').click();
        cy.get('#ButtonClose').click();

        cy.end()
    })
    it('Deve poder logar', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[name="email"]').type('isabelle_gomes@esctech.com.br')
        cy.get('input[name="password"]').type('Hn1iMlY6jc')
        cy.get('#ButtonLogin').click();

        cy.end()
    })
    it('Deve poder criar pedidos', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[name="email"]').type('isabelle_gomes@esctech.com.br')
        cy.get('input[name="password"]').type('Hn1iMlY6jc')
        cy.get('#ButtonLogin').click()

        cy.get('#ButtonNewOrder').click()

        cy.get('input[name="user_id"]').parent().click()
        cy.contains('Thales Silva').click()
        cy.get('input[name="description"]').type('Almoço')
        cy.get('input[name="quantity"]').type('2')
        cy.get('input[name="price"]').type('25.50')

        cy.get('#ButtonSaveOrder').click()
        cy.get('#ButtonClose').click()

        cy.end()
    })
    
})