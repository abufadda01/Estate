import React from 'react'
import { useSelector } from 'react-redux'


const Profile = () => {

  const {currentUser} = useSelector((state) => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-center text-3xl mt-8 font-bold'>Profile</h1>

      <form className='flex flex-col mt-5 gap-4'>
      
        <img src={currentUser.avatar} className='rounded-lg h-24 w-24 object-cover cursor-pointer self-center' alt="" />
      
        <input type="text" className='rounded-md border p-3' name='username' placeholder="username" />
        <input type="email" className='rounded-md border p-3' name='email' placeholder="name@example.com" />
        <input type="password" className='rounded-md border p-3' name='password' placeholder="********" />

        <button className='bg-slate-700 rounded-lg p-3 text-white cursor-pointer hover:opacity-90 uppercase disabled:opacity-75'>update profile</button>

      </form>

      <div className='flex justify-between mt-5'>

        <span className='text-red-700 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-700 font-semibold cursor-pointer'>Sign Out</span>

      </div>


    </div>
  )
}

export default Profile