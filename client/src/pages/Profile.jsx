import React , {useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage , ref , uploadBytesResumable} from "firebase/storage" 
import { app } from '../firebase'


const Profile = () => {

  const {currentUser} = useSelector((state) => state.user)

  // create a reference value
  const fileRef = useRef(null)

  const [file , setFile] = useState(undefined)
  const [filePerc , setFilePerc] = useState(0)
  const [fileUploadError , setFileUploadError] = useState(false)

  const [formData , setFormData] = useState({

  })

  
  useEffect(() => {

    if(file){
      handleFileUpload(file)
    }

  } , [file])
  


  const handleFileUpload = (file) => {

    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage , fileName)
    const uploadTask = uploadBytesResumable(storageRef , file)

    // add an event to the uploaded task ("when the state change" , (snapshot : to access any thing that happens)) 
    uploadTask.on("state_changed" , (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setFilePerc(Math.round(progress))
    },
    // if there is an error
    (error) => {
      setFileUploadError(true)
    },
    // if every thing success
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setFormData({...formData , avatar : downloadUrl})
      })
    }
    )
  }
  


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-center text-3xl mt-8 font-bold'>Profile</h1>

      <form className='flex flex-col mt-5 gap-4'>

        {/* // assign the ref value to the input field (we catch the input field inside this ref) */}
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />

        {/* // every time we click on the image at will act as we click on the input field , because the ref.current object contain the input field */}
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='rounded-lg h-28 w-24 object-cover cursor-pointer self-center' alt="" />

        <p className='text-sm self-center'>
          {
            fileUploadError 
            ? 
              <span className='text-red-700'>Erron while upload image</span>
            :
            filePerc > 0 && filePerc < 100 
            ? 
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            :
            filePerc === 100
            ?
              <span className='text-green-600'>Successfully uploaded</span>
            :
              ""
          }
        </p>

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