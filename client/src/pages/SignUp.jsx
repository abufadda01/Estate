import React from 'react'
import {Link} from "react-router-dom"

const SignUp = () => {
  return (
    <div className='max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-9'>Sign Up</h1>

      <form className='flex flex-col gap-5'>

        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type="text" placeholder='name@example.com' className='border p-3 rounded-lg' id='email' />
        <input type="text" placeholder='********' className='border p-3 rounded-lg' id='password' />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Sign up</button>

      </form>

      <div className='flex gap-2 mt-3'>
        <p>Have an account ?</p>
        <Link className='text-blue-700' to="/sign-in">Sign in</Link>
      </div>

    </div>
  )
}

export default SignUp