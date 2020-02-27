import React, { useState } from 'react'

const SignUpForm = ({ createUser }) => {
  const [credentials, setCredentials] = useState({ username: '', name: '', email: '' })
  const [password, setPassword] = useState('')

  const addUser = async (event) => {
    event.preventDefault()
    const success = await createUser({...credentials, password })

    if (success) {
      setCredentials({ username: '', name: '', email: '' })
      setPassword('')
    }
    
  }

  return (
    <form style={{ margin: 'auto', maxWidth: '50%'}} onSubmit={addUser}>
      <div className='form-group row'>
        <label htmlFor='username' className='col-sm-3 col-form-label'>
          Username
        </label>
        <div className='col-sm-9'>
          <input type='text' className='form-control' value={credentials.username} id='username' required
            onChange={({ target }) => (setCredentials({ ...credentials, username: target.value }))} />
          <small id='usernameHelp' className='form-text text-muted'>minimum length, 3</small>
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor='name' className='col-sm-3 col-form-label'>
          Name
        </label>
        <div className='col-sm-9'>
          <input type='text' className='form-control' value={credentials.name} id='name' required
            onChange={({ target }) => (setCredentials({ ...credentials, name: target.value }))} />
            <small id='nameHelp' className='form-text text-muted'>minimum length, 3</small>
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor='email' className='col-sm-3 col-form-label'>
          Email
        </label>
        <div className='col-sm-9'>
          <input type='text' className='form-control' value={credentials.email} id='email' required
            onChange={({ target }) => (setCredentials({ ...credentials, email: target.value }))} />
            <small id='emailHelp' className='form-text text-muted'>kindly provide a 'valid' address</small>
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor='password' className='col-sm-3 col-form-label'>
          Password
        </label>
        <div className='col-sm-9'>
          <input type='password' className='form-control' value={password} id='password' required
            onChange={({ target }) => ( setPassword(target.value) )} />
          <small id='passwordHelp' className='form-text text-muted'>The longer, the merrier</small>
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-sm-10'>
          <button type='submit' className='btn btn-light btn-lg'>Submit</button>
        </div>
      </div>
    </form>
  )
}



export default SignUpForm