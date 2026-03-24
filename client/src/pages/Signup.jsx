import React from 'react'

const uri = import.meta.env.MODE === "production" ? "/api/user/oauth/google" : "http://localhost:3000/api/user/oauth/google";

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      <a href={uri} className='text-blue-400'>GOOGLE LOGIN</a>
    </div>
  )
}

export default Signup
