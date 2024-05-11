import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Navigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();
   function login (e) {
    e.preventDefault();
     fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(res => res.json()
    .then(data => {
      if (data.msg) {
        toast.error(data.msg);
      }else{
        navigate('/')
      }
  }))

}
  return (
    <>
    <Navbar />
    <div className="flex justify-center   ">
        <form onSubmit={login} className='flex flex-col gap-4 mt-20'>
            <h1 className="font-semibold text-xl">Login </h1>
            <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} className="p-2 border-2 w-[300px] border-slate-500 outline-none  rounded-md" />
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  className="p-2 border-2 w-[300px] border-slate-500 outline-none  rounded-md" />
            <button className="p-2 bg-gray-600 rounded-md transition-all duration-300  text-white text-lg hover:bg-gray-700">Login</button>
        </form>
    </div>

</>
  )
}

export default Login