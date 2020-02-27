describe('Blog app', function() {
    beforeEach(function() {

      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'Maija',
        name: 'Maija Mehiläinen',
        email: 'porriainen@email.com',
        password: 'sateenvarjokala'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
      cy.contains('Greetings')

      cy.get('a').then(anchors => {
        cy.wrap(anchors[0]).should('contain', 'home')
        cy.wrap(anchors[1]).should('contain', 'signup')
        cy.wrap(anchors[2]).should('contain', 'login')
      })
    })
  })