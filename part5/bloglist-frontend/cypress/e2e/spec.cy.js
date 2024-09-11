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
    cy.get('#username').type('123123')
    cy.get('#password').type('123123')
    cy.get('#login-button').click()
    cy.contains('blogs')
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
})

describe('Only the creator can see the delete button', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: '123123',
      username: '123123',
      password: '123123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('http://localhost:5173')
    cy.get('#username').type('123123')
    cy.get('#password').type('123123')
    cy.get('#login-button').click()
    cy.contains('create new').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('cypress')
    cy.get('#url').type('cypress.com')
    cy.get('#create-button').click()
    cy.contains('view').click()
    cy.get('#logout-button').click()
  })

  it('Another user cannot see the delete button', function() {
    const anotherUser = {
      name: '12341234',
      username: '12341234',
      password: '12341234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotherUser)
    cy.visit('http://localhost:5173')
    cy.get('#username').type('12341234')
    cy.get('#password').type('12341234')
    cy.get('#login-button').click()
    cy.contains('view').click()
    cy.contains('remove').should('not.exist')
  })
})