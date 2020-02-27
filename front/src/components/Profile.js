import React, { useState, useEffect } from 'react'
import userService from '../services/user'

const Profile = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    name: '',
    email: '',
  })

  useEffect(() => {
    userService.find(
        JSON.parse(window.localStorage.getItem('loggedAppUser')).username
      ).then(credentials => { setCredentials(credentials) })
  }, [])

  return (
    <div className='card text-center' style={{ margin: 'auto', maxWidth: '45%'}}>
        <img src='/user.png' className='card-img-top' alt='profile' />
        <div className="card-header font-weight-bold">
          My account
        </div>
        <div className='card-body'>
          <h5 className='card-title'>Username</h5>
          <p className='card-text'>{credentials.username}</p>
        </div>
        <div className='card-body'>
          <h5 className='card-title'>Name</h5>
          <p className='card-text'>{credentials.name}</p>
        </div>
        <div className='card-body'>
          <h5 className='card-title'>email</h5>
          <p className='card-text'>{credentials.email}</p>
        </div>
    </div>
  )
}

export default Profile