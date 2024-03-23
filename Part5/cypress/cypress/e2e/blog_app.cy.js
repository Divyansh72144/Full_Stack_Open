describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing')
    const user = {
      username: 'testuser7',
      password: 'testpassword7',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('input:first').type('testuser7')
      cy.get('input:last').type('testpassword7')
      cy.contains('login').click()
      cy.contains('testuser7 logged in')
    })


    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('input:first').type('testuser14')
      cy.get('input:last').type('testpassword6')
      cy.contains('login').click()
      cy.contains('Error: Username or Password is incorrect').invoke('css', 'color').should('eq', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('input:first').type('testuser7')
      cy.get('input:last').type('testpassword7')
      cy.contains('login').click()
      cy.contains('testuser7 logged in')
      cy.contains('Add New Blog').click()
      cy.get('#Title-input').type('title created by cypress')
      cy.get('#Author-input').type('author created by cypress')
      cy.get('#URL-input').type('url created by cypress')
      cy.contains('Create').click()
      cy.contains('Sort by Likes').click()
      cy.contains('title created by cypress')
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

    it.only('users can like the blog', function() {
      cy.reload()
      cy.wait(3000)
      cy.contains('Sort by Likes').should('be.visible').click()
      cy.contains('View').click()
      cy.get('#Like-button').should('be.visible').click()
      cy.wait(2000)
      cy.reload()
      cy.wait(2000)
      cy.contains('Sort by Likes').click()
      cy.contains('View').click()
      cy.contains('Likes: 1').should('be.visible')
    })
  })

})
