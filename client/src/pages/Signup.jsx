import React, { useState } from 'react'
import {} from "react-icons"

const uri = import.meta.env.MODE === "production" ? "/api/user/oauth/google" : "http://localhost:3000/api/user/oauth/google";

const Signup = () => {
  const [user,setUser] = useState({fullName:null,email:null,password:null})

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <div className='min-w-sm max-w-md p-3 bg-amber-50 flex flex-col items-center justify-center rounded-2xl'>
        <h2 className='w-full text-black text-center text-2xl'>SignUp</h2>


        <div>
          <a href={uri} className='text-white'>
              google
          </a>
        </div>
      </div>
    </div>
  )
}

export default Signup
