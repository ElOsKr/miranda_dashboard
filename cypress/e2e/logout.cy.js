describe('Test logout', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/miranda_dashboard')
      cy.url().should('eq','http://localhost:3000/miranda_dashboard/login')
    })
  
    it("Check logout succesful", () => {
      cy.get('[data-cy="mail"]').type('admin@admin.com')
      cy.get('[data-cy="password"]').type('admin')
      cy.get('[data-cy="submit"]').click().then(() => {
        expect(window.localStorage.getItem('user')).to.equal(JSON.stringify({mail: 'admin@admin.com', isLogged: true}))
      })
      cy.url().should('eq','http://localhost:3000/miranda_dashboard')
      cy.get('[data-cy="logout"]').click().then(() => {
        expect(localStorage.getItem('user') === null)
      cy.url().should('eq','http://localhost:3000/miranda_dashboard/login')
      })
    })
  })