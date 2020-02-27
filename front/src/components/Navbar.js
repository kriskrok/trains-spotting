import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => (
  <nav className='navbar navbar-light bg-light'>
    <span className="navbar-text">
    <img src='/train.png' width='60' height='60' alt=''/>
      {!!user ? `welcome ${user.username}` : 'Trains' }
    </span>

    <form className='form-inline'>
    {!user
        ? <Link style={{padding: 5}} to="/">home</Link>
        : <Link style={{padding: 5}} to="/timetable">trains</Link>
    }
    {!user
      ? <Link style={{padding: 5}} to="/signup">signup</Link>
      : <button type="button" style={{fontSize: '1em'}} className="btn btn-link"
        onClick={() => handleLogout()}>
        logout</button>
    }
    {!user
        ? <Link style={{padding: 5}} to="/login">login</Link>
        : <Link style={{padding: 5}} to="/profile">my account</Link>
      }
    </form>
  </nav>
)

export default Navbar
