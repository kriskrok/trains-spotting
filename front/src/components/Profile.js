import React, { useState, useEffect } from 'react'
import userService from '../services/user'

const Profile = () => {
  const [credentials, setCredentials] = useState('')

  useEffect(() => {
    //TODO: Refactor logic, lift state to parent and solve world peace.
    let user = JSON.parse(window.localStorage.getItem('loggedAppUser'))
    setCredentials(user)

    if (user && !user.sessionIndex) {
      userService.find(user.username)
        .then(credentials => {
          setCredentials(credentials)
        })
    }
  }, [])

  return (
    <div>
      { !credentials ? '' :
        <div className='lander'>
          <div className='card text-center' style={{ margin: 'auto', maxWidth: '45%' }}>
            <img src='/user.png' className='card-img-top' alt='profile' />
            <div className="card-header font-weight-bold">
              <p>My account</p>
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
        </div>
      }
    </div>
  )
}

export default Profile