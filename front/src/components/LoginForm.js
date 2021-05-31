import React, { useState } from 'react'

const LoginForm = ({ handleNormalLogin, handleOAuthLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = (event) => {

    event.preventDefault()
    handleNormalLogin({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-7">
            <form onSubmit={userLogin}>
              <div className='form-group row'>
                <label htmlFor='username' className='col-sm-3 col-form-label'>
                  Username
                </label>
                <div className='col-sm-9'>
                  <input type='text' className='form-control' value={username} id='username' required
                    onChange={({ target }) => (setUsername(target.value) )} />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='password' className='col-sm-3 col-form-label'>
                  Password
                </label>
                <div className='col-sm-9'>
                  <input type='password' className='form-control' value={password} id='password' required
                    onChange={({ target }) => ( setPassword(target.value) )} />
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-sm-10'>
                  <button type='submit' className='btn btn-light btn-lg'>Sign in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-7">
            <button style={{ margin: 'auto', maxWidth: '100%' }} className='btn btn-dark btn-lg'
              onClick={() => handleOAuthLogin()}>OAuth 2.0</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
