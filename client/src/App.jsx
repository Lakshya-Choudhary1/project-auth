import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div className='w-screen h-screen bg-amber-50 flex justify-center items-center'>
      <h1 className='text-3xl text-blue-700'>authproject</h1>
      <a href="/api/user/oauth/google" className="text-blue-500 hover:underline">
        Login with Google
      </a>
    </div>
  )
}

export default App
