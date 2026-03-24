import React from 'react'
import { Link } from 'react-router-dom'

const login = () => {
  return (
    <div>
      <h1>login</h1>
      <Link to="/signup">Signup</Link>
    </div>
  )
}

export default login
