import React from 'react'
import {GoogleAuthProvider , getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase'
import axios from "axios"
import { signInSuccess } from '../redux/user/userSlice'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"


const Oauth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async (e) => {
        try {

            const provider = new GoogleAuthProvider()             
            const auth = getAuth(app)

            const googleResult = await signInWithPopup(auth , provider)

            const {displayName , email , photoURL} = googleResult.user

            const response = await axios.post("/api/auth/google" , {
                displayName ,
                email,
                photoURL
            })

            dispatch(signInSuccess(response.data))
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }


  return (
    // we change the type of the button to prevent it from submitting the form because its inside the form so by default it will submit
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg uppercase hover:opacity-90 p-3'>Continue With GOOGLE</button>
  )
}

export default Oauth