require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
let SECRET = process.env.SECRET

/*These from the SSO adminpanel*/
let clientID = process.env.CLIENT_ID
let clientSecret = process.env.OAUTH2_CLIENT_SECRET


let RedirectURI = process.env.REDIRECTURI
let logoutURI = process.env.LOGOUTURI


let SSOAuthPort = process.env.UBIAUTHPORT

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  RedirectURI,
  SSOAuthPort,
  clientID,
  clientSecret,
  logoutURI
}
