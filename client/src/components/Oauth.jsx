import React from 'react'
import {GoogleAuthProvider , getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase'


const Oauth = () => {

    const handleGoogleClick = async (e) => {
        try {

            const provider = new GoogleAuthProvider()            
            const auth = getAuth(app)

            const response = await signInWithPopup(auth , provider)
            
            console.log(response)

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