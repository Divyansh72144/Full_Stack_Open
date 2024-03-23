describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing')
    cy.visit('http://localhost:5173')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('input:first').type('testuser4')
      cy.get('input:last').type('testpassword4')
      cy.contains('login').click()
      cy.contains('testuser4 logged in')
    })


    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('input:first').type('testuser14')
      cy.get('input:last').type('testpassword452')
      cy.contains('login').click()
      cy.contains('Error: Username or Password is incorrect').invoke('css', 'color').should('eq', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('input:first').type('testuser4')
      cy.get('input:last').type('testpassword4')
      cy.contains('login').click()
      cy.contains('testuser4 logged in')
    })

    it('a blog can be created', function() {
      cy.contains('Add New Blog').click()
      cy.get('#Title-input').type('title created by cypress')
      cy.get('#Author-input').type('author created by cypress')
      cy.get('#URL-input').type('url created by cypress')
      cy.contains('Create').click()
      cy.contains('Sort by Likes').click()
      cy.contains('title created by cypress')
    })
  })
})