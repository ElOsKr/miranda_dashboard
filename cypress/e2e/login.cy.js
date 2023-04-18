describe('Test login', () => {
  it("Check login succesful", () => {
    cy.visit('http://localhost:3000/miranda_dashboard')
    cy.url().should('eq','http://localhost:3000/miranda_dashboard/login')
    cy.get('input[name="mail"]').type('admin@admin.com')
    cy.get('input[name="password"]').type('admin')
    cy.get('input[name="submit"]').click()
  })

  it("Check login not succesful", () => {
    cy.visit('http://localhost:3000/miranda_dashboard')
    cy.url().should('eq','http://localhost:3000/miranda_dashboard/login')
    cy.get('input[name="mail"]').type('a')
    cy.get('input[name="password"]').type('a')
    cy.get('input[name="submit"]').click()
  })
})