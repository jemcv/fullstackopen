describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: '123123',
      username: '123123',
      password: '123123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
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

describe('When logged in', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
    cy.get('#username').type('123123')
    cy.get('#password').type('123123')
    cy.get('#login-button').click()
  })

  it('A blog can be created', function() {
    cy.contains('create new').click()
    cy.get('#title').type('A Cypress blog')
    cy.get('#author').type('cypress')
    cy.get('#url').type('cypress.com')
    cy.get('#create-button').click()
    cy.contains('A Cypress blog')
  })

  it('A blog can be liked', function() {
    cy.contains('create new').click()
    cy.get('#title').type('A Cypress blog')
    cy.get('#author').type('cypress')
    cy.get('#url').type('cypress.com')
    cy.get('#create-button').click()
    cy.contains('view').click()
    cy.contains('Like').click()
    cy.contains('likes 1')
  })

  it('A blog can be deleted', function() {
    cy.contains('create new').click()
    cy.get('#title').type('A Cypress blog')
    cy.get('#author').type('cypress')
    cy.get('#url').type('cypress.com')
    cy.get('#create-button').click()
    cy.contains('view').click()
    cy.contains('remove').click()
    cy.get('.blog').should('not.exist')
  }) 
})