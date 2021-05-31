describe('Trains app', function() {
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

  it('Landing page is shown', function() {
    cy.contains('Greetings')

    cy.get('a').then(anchors => {
      cy.wrap(anchors[0]).should('contain', 'home')
      cy.wrap(anchors[1]).should('contain', 'signup')
      cy.wrap(anchors[2]).should('contain', 'login')
    })
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()

      cy.get('#username').type('Maija')
      cy.get('#password').type('sateenvarjokala')
      cy.contains('Sign in').click()

      cy.contains('welcome Maija')
      cy.get('a').then(anchors => {
        cy.wrap(anchors[0]).should('contain', 'trains')
        cy.wrap(anchors[1]).should('contain', 'my account')
      })
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Haisuli')
      cy.get('#password').type('mamelukki-kala')
      cy.contains('Sign in').click()

      cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid credentials, do give it a second spin')
      })

      cy.get('nav')
        .should('not.contain', 'welcome Nipsu')
    })
  })

  describe('Signing up a new user', function() {
    beforeEach(function() {
      cy.get('a[href="/signup"]').click()
    })
    it('Signup form is shown', function() {
      cy.get('form>div>label').then(labels => {
        cy.wrap(labels[0]).should('contain', 'Username')
        cy.wrap(labels[1]).should('contain', 'Name')
        cy.wrap(labels[2]).should('contain', 'Email')
        cy.wrap(labels[3]).should('contain', 'Password')
      })
    })

    it('succeeds with valid input', function() {

      cy.get('#username').type('Hemuli')
      cy.get('#name').type('Muumilaakson Hemuli')
      cy.get('#email').type('seitsemanemia@luonnontieteellinen.fi')
      cy.get('#password').type('kasvikokoelma')
      cy.contains('Submit').click()

      cy.on('window:alert', (str) => {
        expect(str).to.equal('succesfully created, yay!')
      })
    })

    it('succesfully created user can log in', function() {
      cy.createUser({
        username: 'Vilijonkka',
        name: 'Vilijonkka Von Von',
        email: 'timantitovatikuisia@vauva.fi',
        password: 'kiltit_lapset',
      })

      cy.contains('login').click()

      cy.get('#username').type('Vilijonkka')
      cy.get('#password').type('kiltit_lapset')
      cy.contains('Sign in').click()

      cy.contains('welcome Vilijonkka')
      cy.get('a').then(anchors => {
        cy.wrap(anchors[0]).should('contain', 'trains')
        cy.wrap(anchors[1]).should('contain', 'my account')
      })
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Maija', password: 'sateenvarjokala' })
    })

    it('trains page is reachable', function() {
      cy.get('a[href="/timetable"]').click()

      cy.get('thead>tr>th').then(descriptors => {
        cy.wrap(descriptors[0]).should('contain', 'id')
        cy.wrap(descriptors[1]).should('contain', 'Name')
        cy.wrap(descriptors[2]).should('contain', 'Destination')
        cy.wrap(descriptors[3]).should('contain', 'Speed')
        cy.wrap(descriptors[4]).should('contain', 'Coordinates')
      })

      cy.get('table').should('contain', 'Train data')
    })

    it('profile page is reachable', function() {
      cy.get('a[href="/profile"]').click()

      cy.get('.card-body').then(field => {
        cy.wrap(field[0]).should('contain', 'Maija')
        cy.wrap(field[1]).should('contain', 'Maija Mehiläinen')
        cy.wrap(field[2]).should('contain', 'porriainen@email.com')
      })

      cy.get('.card-header').should('contain', 'My account')
    })

    it('clicking logout logs user out', function() {
      cy.get('button').contains('logout').click()

      cy.contains('Greetings')

      cy.get('a').then(anchors => {
        cy.wrap(anchors[0]).should('contain', 'home')
        cy.wrap(anchors[1]).should('contain', 'signup')
        cy.wrap(anchors[2]).should('contain', 'login')
      })
    })
  })










})