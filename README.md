# trains-spotting coding exercise :cyclone:
### Sovellus [Heroku](https://trains-spotting.herokuapp.com/) -palvelussa
***

### Sivusto junien seurantaan
Käyttäjät voivat luoda sivustolle oman käyttäjätilin tai vaihtoehtoisesti kokeilla palvelua testitunnuksella.
- username: ```Maija```
- password: ```sateenvarjokala```

Kirjautuneilla käyttäjillä on mahdollisuus tarkastella omia käyttäjätietojaan sekä junien sijaintitietoja, jotka päivittyvät 10 sekunnin välein.

Sovellus koostuu [React](https://reactjs.org/) -kirjastoa hyödyntävästä frontendistä, joka tukeutuu [Node.js](https://nodejs.org/):llä toteutettuun backendiin. Kunkin lähdekoodi majailee nimensä mukaisessa hakemistossa.

#### Hieman testeistä
Sekä Frontendin että Backendin yksikkötestaukseen on käytetty [Jest](https://jestjs.io/) -testikirjastoa.

Backendin integraatiotestausta tehdään hyödyntämällä [supertest](https://github.com/visionmedia/supertest) -kirjastoa.

Myös sovelluksen API rajapintaa testataan hyödyntäen supertest -kirjastoa.

Koko järjestelmän e2e-testejä suoritetaan [Cypress](https://www.cypress.io/) -testikirjaston siipien alla.

___
**_Happy trainsspotting!_**
