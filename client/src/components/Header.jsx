import React from 'react'
import { Link } from 'react-router-dom'
import {FaSearch} from "react-icons/fa"
import {useSelector} from "react-redux"


const Header = () => {

  const {currentUser} = useSelector((state) => state.user)


  return (
    <header className='bg-slate-300 shadow-md'>

      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>

      <Link to="/">
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Laith</span>
        <span className='text-orange-500'>Estate</span>
      </h1>
      </Link>

      <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'  />
        <FaSearch className='text-slate-600'/>
      </form>

      <ul className='flex items-center gap-5'>
        <Link to="/">
          <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
        </Link>
        
        <Link to="/about">
          <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
        </Link>
        
        <Link to="/profile">
            {currentUser ? (
              <img className='rounded-full w-11  object-cover h-auto' src={currentUser.avatar} alt="" />
            ) 
            : 
            (
              <li className='text-slate-700 hover:underline'>Sign in</li>
            )
          }
        </Link>

      </ul>
    
      </div>

    </header>
  )
}

export default Header