
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedAppUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  Cypress.Commands.add('createUser', ({ username, name, email, password }) => {
    cy.request({
      url: 'http://localhost:3001/api/users/',
      method: 'POST',
      body: { username, name, email, password },
    })
  
    cy.visit('http://localhost:3000')
  })