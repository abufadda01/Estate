import React , {useState} from 'react'
import {Link , useNavigate} from "react-router-dom"
import axios from "axios"
import {useDispatch , useSelector} from "react-redux"
import { signInStart , signInSuccess , signInFailure } from '../redux/user/userSlice'


const SignIn = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const {loading , error} = useSelector((state) => state.user) // state.slice_name_in_the_store and you will get the initialState object of this slice 

  const [formData , setFormData] = useState({
    email : "" ,
    password : ""
  })


  const [successMsg , setSuccessMsg] = useState(null)
  // const [errorMsg , setErrorMsg] = useState(null)
  // const [loading , setLoading] = useState(false)


  const handleChange = (e) => {
    setFormData({...formData , [e.target.name] : e.target.value})
  }


  const onSubmit = async (e) => {

    e.preventDefault()
    dispatch(signInStart())

    try {

      const response = await axios.post("/api/auth/signin" , formData)
      dispatch(signInSuccess(response.data))
      // setLoading(false)

      setTimeout(() => {
        navigate("/")
      },1500)

    } catch (error) {
      if(!error.response.data.success){
        dispatch(signInFailure(error.response.data.msg))
        // setErrorMsg(error.response.data.msg)
        // setLoading(false)
        setTimeout(() => {
          window.location.reload()
        } , 2000)
      }
    }

  }


  return (
    <div className='max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-9'>Login</h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-5'>

        <input type="email" onChange={handleChange} name='email' placeholder='name@example.com' className='border p-3 rounded-lg' id='email' />
        <input type="password" onChange={handleChange} name='password' placeholder='********' className='border p-3 rounded-lg' id='password' />

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? "Loading..." : "Login"}
        </button>

      </form>

      <div className='flex gap-2 mt-3'>
        <p>Don't Have an account ?</p>
        <Link className='text-blue-700' to="/sign-up">Sign up</Link>
      </div>

      {error && <p className='text-red-500 text-lg mt-5'>{error}</p>}

    </div>
  )
}

export default SignIn