import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import {useDispatch} from 'react-redux'
import { setSearch } from '../Redux/SearchSlice'
const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://blogappapi.vercel.app/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      })
    })
  }, [])

  function logout() {

    fetch('https://blogappapi.vercel.app/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(res => {
      window.location.reload();
      navigate("/");
      setUserInfo(null);
    })
  }

  const username = userInfo?.username;

  return (
    <div>
      <div className="w-[100%] h-auto lg:h-[70px] flex items-center flex-col lg:flex-row lg:justify-around gap-3 py-3 lg:py-0 lg:gap-0 bg-cyan-500 shadow-xl">
         <Link to={'/'} ><div className="font-bold flex justify-start text-2xl">BLOG APP.</div> </Link>
         
         <div className="font-bold text-2xl">
            <input type='text' placeholder='Search here' onChange={(e)=>dispatch(setSearch(e.target.value))} className=" p-2 text-sm font-normal outline-none bg-zinc-200 text-black rounded-sm w-[350px]" />
          </div> 

        {
          username && (
          <div className="flex items-center font-semibold transition-all duration-500    justify-center gap-3 lg:gap-6">
            <span className="hover:text-gray-600 cursor-default ">Hello, {username}</span>
            <Link to={'/create'} className="flex text-4xl hover:text-gray-500  text-gray-700 justify-center items-center " ><AiOutlinePlusCircle /></Link>
            <Link onClick={logout} className="hover:text-gray-600 " >Logout</Link>
          </div>)
        }
        {
          !username && (
            <div className="flex items-center font-semibold  justify-center gap-6">
              <Link to={'/login'} >Login</Link>
              <Link to={'/register'} >Signup</Link>
            </div>

          )
        }
      </div>
    </div>
  )
}

export default Navbar