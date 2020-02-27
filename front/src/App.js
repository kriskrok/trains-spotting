import React, { useState, useEffect } from 'react'
/* import ReactDOM from 'react-dom' */
import {
  Switch, Route, /* Link, */ useHistory, Redirect
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

import userService from './services/user'
import loginService from './services/login'
import trainService from './services/trains'

const App = () => {
  const [user, setUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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
      alert('Welcome back!')
    } catch (exception) {
      console.log('er', exception)
      alert('Invalid credentials, do give it a second spin')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    trainService.setToken(null)
    setUser(null)
    history.push('/')
  }

  const addUser = async (credentials) => {
    try {
      await userService.create(credentials)
      alert('succesfully created, yay!')
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
          <LoginForm handleLogin={handleLogin} />
        </Route>
        <Route path='/signup'>
          <SignUpForm createUser={addUser} />
        </Route>
        <Route path='/timetable'>
          {user ? <Trains /> : <Redirect to="/login" />}
        </Route>
        <Route path='/profile'>
          {user ? <Profile /> : <Redirect to="/login" />}
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
