import React, { useState } from 'react'
import {Link , useNavigate} from "react-router-dom"
import axios from "axios"


const SignUp = () => {

  const navigate = useNavigate()

  const [formData , setFormData] = useState({ 
    username : "" ,
    email : "" ,
    password : ""
  })

  const [errorMsg , setErrorMsg] = useState(null)
  const [successMsg , setSuccessMsg] = useState(null)
  const [loading , setLoading] = useState(false)


  const handleChange = (e) => {
    setFormData({...formData , [e.target.name] : e.target.value})
  }


  const onSubmit = async (e) => {

    e.preventDefault()
    setLoading(true)

    try {

      const response = await axios.post("/api/auth/signup" , formData)
      setLoading(false)
      setSuccessMsg(`Welcome ${formData.username}`)

      setTimeout(() => {
        navigate("/sign-in")
      },1500)

    } catch (error) {
      if(!error.response.data.success){
        setErrorMsg(error.response.data.msg)
        setLoading(false)
      }
    }

  }


  return (
    <div className='max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-9'>Sign Up</h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-5'>

        <input type="text" onChange={handleChange} name='username' placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type="email" onChange={handleChange} name='email' placeholder='name@example.com' className='border p-3 rounded-lg' id='email' />
        <input type="password" onChange={handleChange} name='password' placeholder='********' className='border p-3 rounded-lg' id='password' />

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? "Loading..." : "Sign up"}
        </button>

      </form>

      <div className='flex gap-2 mt-3'>
        <p>Have an account ?</p>
        <Link className='text-blue-700' to="/sign-in">Sign in</Link>
      </div>

      {errorMsg && <p className='text-red-500 text-lg mt-5'>{errorMsg}</p>}
      {successMsg && <p className='text-green-500 text-lg mt-5'>{successMsg}</p>}

    </div>
  )
}

export default SignUp