import React, { useState, useEffect } from 'react'
import userService from '../services/user'

const ProtectedView = ({  history, user }) => {
  const [authUser, setAuthUser] = useState({})

  useEffect(() => {
    try {
      userService.getAttributes()
        .then(result => {
          setAuthUser(result)
          if (!result) {
            alert('Could not claim protected attributes.')
            history.push('/')
          }
        })
    } catch (exception) {
      console.error('Sadly something went amiss with authorization', exception)
    }
  }, [])

  const getToken = async () => {
    try {
      const token = await userService.getToken()
      console.log(`Access token: ${token.access_token}`)

    } catch (er) {
      console.log('Could not retrieve Access Token')
    }
  }

  const getAttr = async () => {
    try {
      const attributes = await userService.getAttributes()
      console.log('Claimed attributes:', attributes)
    } catch (er) {
      console.log('Could not retrieve claimed attributes')
    }
  }

  const getIDtoken = async () => {
    try {
      const attributs = await userService.getIDToken()
      console.log('ID-token: ', attributs.id_token)
    } catch (er) {
      console.log('Could not retrieve ID-token', er)
    }
  }

  return (
    <div className="lander" style={{ padding: '20px 0' }}>
      <div className="lander text-center" style={{ padding: '20px 0' }}>
        { user && user.sessionIndex ?
          <div>
            <div>
              <button style={{ margin: 'auto', maxWidth: '100%' }} className='btn btn-dark btn-lg'
                onClick={() => getToken() }>Token</button>
              <button style={{ margin: 'auto', maxWidth: '100%' }} className='btn btn-dark btn-lg'
                onClick={() => getAttr() }>Attributes</button>
              <button style={{ margin: 'auto', maxWidth: '100%' }} className='btn btn-dark btn-lg'
                onClick={() => getIDtoken() }>IDToken</button>
            </div>
            <h1 style={{ paddingTop: '1em', paddingBottom: '0.5em' }}>Claimed attributes</h1>
            <div style={{ margin: 'auto', width: '50%' }}>
              <div className="well well-lg"><p>{authUser.name}</p></div>
              <div className="well well-lg"><p>{authUser.surname}</p></div>
              <div className="well well-lg"><p>{authUser.email}</p></div>
            </div>
          </div>
          :
          <div>
            <h1>Brace for authorization</h1>
            <div className="card text-center bg-dark text-light" style={{ margin: 'auto', width: '50%' }}>
              <div className="card-body">
                <h5 className="card-title">Processing</h5>
              </div>
              <img className="card-img-bottom" style={{ padding: '5' }}src="https://http.cat/102" alt="Card image cap" />
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default ProtectedView