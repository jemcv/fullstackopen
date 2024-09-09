describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  it('Successful login', function() {
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.get('#login-button').click()
  })   
  it('Unsuccessful login', function() {
    cy.get('#username').type('test')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').should('contain', 'Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})