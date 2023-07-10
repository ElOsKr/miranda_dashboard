describe('Test login', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/miranda_dashboard')
    cy.url().should('eq','http://localhost:3000/miranda_dashboard/login')
  })

  it("Check login succesful", () => {
    cy.get('[data-cy="mail"]').type('admin@admin.com')
    cy.get('[data-cy="password"]').type('admin')
    cy.get('[data-cy="submit"]').click()
    cy.url().should('eq','http://localhost:3000/miranda_dashboard')
  })

  it("Check login not succesful", () => {
    cy.get('[data-cy="mail"]').type('ab')
    cy.get('[data-cy="password"]').type('a')
    cy.get('[data-cy="submit"]').click()
    cy.url().should('eq','http://localhost:3000/miranda_dashboard/login')
  })
})