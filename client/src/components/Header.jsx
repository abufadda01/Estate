import React, { useEffect, useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {FaSearch} from "react-icons/fa"
import {useSelector} from "react-redux"


const Header = () => {

  const {currentUser} = useSelector((state) => state.user)

  const [searchTerm , setSearchTerm] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()

    // get the full url with its pervious quries 
    const urlParams = new URLSearchParams(window.location.search)
    // add a new query key called searchTerm
    urlParams.set("searchTerm" , searchTerm)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)

  }



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")

    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
        
  } , [location.search])



  return ( 
    <header className='bg-slate-300 shadow-md'>

      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>

      <Link to="/">
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Laith</span>
        <span className='text-orange-500'>Estate</span>
      </h1>
      </Link>

      <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
      
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'  />
      
        <button>
          <FaSearch className='text-slate-600'/>
        </button>
      
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