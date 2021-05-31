import React, { useState, useEffect } from 'react'
import {
  Switch, Route, useHistory, Redirect
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css'

import Lander from './components/Lander'
import Navbar from './components/Navbar'
import Trains from './components/Trains'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import ProtectedView from './components/ProtectedView'

import userService from './services/user'
import loginService from './services/login'
import trainService from './services/trains'

const App = () => {
  const history = useHistory()
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getSessionIndex()
      .then(data => {
        if (data.index){ //Have we got an active session; index == user used OIDC
          window.localStorage.setItem(
            'sessionIndex', JSON.stringify(data.index))

          userService.getAttributes()
            .then(attributes => {
              //set name as username for backward compatibility:
              let user = { 'username': attributes.name, 'name': `${attributes.name} ${attributes.surname}`, 'sessionIndex': data.index }
              setUser(user)

              window.localStorage.setItem(
                'loggedAppUser', JSON.stringify(user))
            })
        }
      }).catch(error => {
        console.error('Could not fetch session index, error:', error)
      })

    //oldie set credentials
    const userJSON = window.localStorage.getItem('loggedAppUser')

    if (userJSON && !JSON.parse(userJSON).sessionIndex) {
      const user = JSON.parse(userJSON)
      trainService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      trainService.setToken(user.token)
      setUser(user)
      history.push('/')
      alert(`Welcome back ${user.username}!`)
    } catch (exception) {
      console.log('er', exception)
      alert('Invalid credentials, do give it a second spin')
    }
  }

  const handleOAuthLogin = async () => {
    try {
      const authUrl = await loginService.oauthLogin()
      window.location.assign(authUrl)
    } catch (exception) {
      console.log('er', exception)
      alert('Sadly something went amiss , do give it a second spin')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedAppUser')
    window.localStorage.removeItem('sessionIndex')

    trainService.setToken(null)
    setUser(null)

    const logoutURI = await loginService.logout()
    window.location.assign(logoutURI)
  }

  const addUser = async (credentials) => {
    try {
      await userService.create(credentials)
      alert('Succesfully created, yay!')
      history.push('/login')
    } catch (exception) {
      alert('Sadly something went amiss , do give it a second spin')
    }
  }

  return (
    <div className='App container'>
      <Navbar user={user} handleLogout={handleLogout}/>
      <Switch>
        <Route path='/login'>
          <LoginForm handleNormalLogin={handleLogin} handleOAuthLogin={handleOAuthLogin} />
        </Route>
        <Route path='/signup'>
          <SignUpForm createUser={addUser} />
        </Route>
        <Route path='/timetable'>
          {user && !user.sessionIndex ? <Trains /> : <Redirect to="/" />}
        </Route>
        <Route path='/profile'>
          {user ? <Profile user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route path='/protected'>
          <ProtectedView history={history} user={user} />
        </Route>
        <Route exact path='/'>
          <Lander />
        </Route>
        <NotFound />
      </Switch>
    </div>
  )
}

export default App
