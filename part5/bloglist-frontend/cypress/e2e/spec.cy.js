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
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      username: '123123',
      password: '123123'
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })
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
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      username: '123123',
      password: '123123'
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })
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
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      username: '12341234',
      password: '12341234'
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })
    cy.contains('view').click()
    cy.contains('remove').should('not.exist')
  })

  it('Blogs are ordered by likes', function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      username: '123123',
      password: '123123'
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })

    cy.createBlog({ title: 'first blog', author: 'cypress', url: 'url1.com', likes: 1 })
    cy.createBlog({ title: 'second blog', author: 'cypress', url: 'url2.com', likes: 2 })
    cy.createBlog({ title: 'third blog', author: 'cypress', url: 'url3.com', likes: 3 })

    cy.get('.blog').eq(0).should('contain', 'third blog')
    cy.get('.blog').eq(1).should('contain', 'second blog')
    cy.get('.blog').eq(2).should('contain', 'first blog')
  })
})