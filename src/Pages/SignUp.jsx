import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();
    const response = await fetch('https://blogapp-gdn9.vercel.app/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok === true) {
      setRedirect(true);
    }else {
      alert("Please enter valid details or username has been already used.");
    }
  }

  if(redirect){
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center  ">
        <form onSubmit={register} className='flex flex-col gap-4 mt-20'>
          <h1 className="font-semibold text-xl">Sign Up </h1>
          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 border-2 w-[300px] border-slate-500 outline-none  rounded-md" />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border-2 w-[300px]  border-slate-500 outline-none  rounded-md" />
          <button className="p-2 bg-gray-600 rounded-md transition-all duration-300  text-white text-lg hover:bg-gray-700">Register</button>
        </form>
      </div>

    </>
  )
}

export default SignUp