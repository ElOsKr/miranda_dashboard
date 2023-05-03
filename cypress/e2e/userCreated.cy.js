describe('Test createdUser', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/miranda_dashboard')
      cy.url().should('eq','http://localhost:3000/miranda_dashboard/login')
    })
 
    it("Check user created succesfully", () => {
      cy.get('[data-cy="mail"]').type('admin@admin.com')
      cy.get('[data-cy="password"]').type('admin')
      cy.get('[data-cy="submit"]').click()
      cy.url().should('eq','http://localhost:3000/miranda_dashboard')
      cy.get('[data-cy="Users"]').click()
      cy.url().should('eq','http://localhost:3000/miranda_dashboard/users')
      cy.get('[data-cy="addEmployee"]').click()
      cy.get('[data-cy="name"]').type('oscar')
      cy.get('[data-cy="password"]').type('oscar')
      cy.get('[data-cy="email"]').type('a@a.com')
      cy.get('[data-cy="phone"]').type('123456789')
      cy.get('[data-cy="startDate"]').click().type('2023-04-20T00:00')
      cy.get('[data-cy="job"]').select('manager').should('have.value','manager')
      cy.get('[data-cy="functions"]').type('a')
      cy.get('[data-cy="active"]').check()
      cy.get('[data-cy="submit"]').click()
      cy.get('[data-cy="done"]').contains("User created")
      cy.window().its('store').invoke('getState').its('users').its("userCreated").should('deep.equal', {
        name: "oscar",
        password: "oscar",
        email: 'a@a.com',
        phone: '123456789',
        startDate: '2023-04-20T00:00',
        job: "manager",
        functions: "a",
        status: "on"           
      })
    })
  })