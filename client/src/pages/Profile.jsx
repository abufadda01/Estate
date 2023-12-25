import React , {useEffect, useRef, useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {getDownloadURL, getStorage , ref , uploadBytesResumable} from "firebase/storage" 
import { app } from '../firebase'
import { updateUserStart , updateUserSuccess , updateUserFailure , deleteUserProfileStart , deleteUserProfileSuccess , deleteUserProfileFailure , removeTokenInLocalStorage , signOutUser } from '../redux/user/userSlice'
import axios from "axios"
import {Link} from "react-router-dom"


const Profile = () => {

  const {currentUser , token , loading , error} = useSelector((state) => state.user)

  const dispatch = useDispatch()

  // create a reference value
  const fileRef = useRef(null)

  const [file , setFile] = useState(undefined) 
  const [filePerc , setFilePerc] = useState(0)
  const [fileUploadError , setFileUploadError] = useState(false)

  const [showEstatesError , setShowEstatesError] = useState(false)
  const [userEstates , setUserEstates] = useState([])

  const [formData , setFormData] = useState({})


  
  useEffect(() => {

    if(file){
      handleFileUpload(file)
    }

  } , [file])



  const handleChange = e => {
    setFormData({...formData , [e.target.name] : e.target.value})
  }



  const handleSubmit = async (e) => {

    e.preventDefault()
    
    dispatch(updateUserStart())

    try {

      const response = await axios.post(`/api/user/update/${currentUser._id}` , formData , {
        headers : {
          "access_token" : token
        }
      })

      dispatch(updateUserSuccess(response.data))

    } catch (error) {
      if(!error.response?.data.success){
        dispatch(updateUserFailure(error.response?.data.msg))
      }
    }
  }



  const deleteUser = async (e) => {

    e.preventDefault()
    dispatch(deleteUserProfileStart())

    try {

      await axios.delete(`/api/user/delete/${currentUser._id}` , {
        headers : {
          "access_token" : token
        }
      })
      
      dispatch(deleteUserProfileSuccess())
      dispatch(removeTokenInLocalStorage())

    } catch (error) {
      if(!error.response?.data.success){
        dispatch(deleteUserProfileFailure(error.response?.data.msg))
      }
    }
  }



  const signOut = () => {
    dispatch(removeTokenInLocalStorage())
    dispatch(signOutUser())
  }
  


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



  const handleShowEstates = async () => {
    
    try {
      const response = await axios.get(`/api/user/getUserEstates/${currentUser._id}` , {
        headers : {
          "access_token"  : token
        }
      })
      
      setUserEstates(response.data)
    
    } catch (error) {
      setShowEstatesError(true)
    }
  }
  


  const handleEstateDelete = async (estateId) => {
    
    try {
      await axios.delete(`/api/estate/deleteEstate/${estateId}` , {
        headers : {
          "access_token" : token
        }
      })

      setUserEstates(prev => prev.filter((estate) => estate._id !== estateId))

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-center text-3xl mt-8 font-bold'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col mt-5 gap-4'>

        {/* // assign the ref value to the input onChange={handleChange} field (we catch the input onChange={handleChange} field inside this ref) */}
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />

        {/* // every time we click on the image at will act as we click on the input onChange={handleChange} field , because the ref.current object contain the input onChange={handleChange} field */}
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='rounded-lg w-24 object-cover cursor-pointer self-center h-auto' alt="" />

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
              <span className='text-green-600'>Image Successfully uploaded</span>
            :
              ""
          }
        </p>

        <input onChange={handleChange} type="text" defaultValue={currentUser.username} className='rounded-md border p-3' name='username' placeholder="username" />
        <input onChange={handleChange} type="email" defaultValue={currentUser.email} className='rounded-md border p-3' name='email' placeholder="name@example.com" />
        <input onChange={handleChange} type="password" className='rounded-md border p-3' name='password' placeholder="********" />

        <button disabled={loading} className='bg-slate-700 rounded-lg p-3 text-white cursor-pointer hover:opacity-90 capitalize disabled:opacity-75'>{loading ? "Loading..." : "update profile"}</button>
        
        <Link to="/create-estate" className='bg-green-600 text-white text-center p-3 rounded-lg cursor-pointer capitalize hover:opacity-90 '>Create Estate</Link>

      </form>

      <div className='flex justify-between mt-5'>

        <span onClick={deleteUser} className='text-red-700 font-semibold cursor-pointer'>Delete Account</span>
        <span onClick={signOut} className='text-red-700 font-semibold cursor-pointer'>Sign Out</span>

      </div>

      {error && <p className='text-red-600 font-semibold'>{error}</p>}

      <button onClick={handleShowEstates} className='text-green-600 w-full font-semibold capitalize mt-2 mb-4'>show estates</button>
      
      {showEstatesError && <p className='text-red-600 font-semibold'>Failed to show user estates</p>}


      {userEstates && userEstates.length > 0 &&       
        <div className='flex flex-col gap-2 mt-3'>
          
          <h1 className='text-center font-semibold text-slate-700 capitalize text-2xl mt-3'>your estates</h1>
          
          {userEstates.map((estate) => {
            return(
              <div key={estate._id} className='flex justify-between items-center gap-5 p-3 border-2 border-slate-200 shadow-md hover:shadow-lg cursor-pointer rounded-lg mt-5 transition-all ease-in duration-150'>
               
                <Link to={`/estate/${estate._id}`}>
                  <img src={estate?.imageUrls && estate.imageUrls[0]} alt="estate-image" className='w-24 h-auto object-cover rounded-lg' />
                </Link>
               
                <Link className='text-slate-700 font-bold capitalize flex-1 truncate hover:underline' to={`/estate/${estate._id}`}>
                  <p>{estate.name}</p>
                </Link>
    
                <div className='flex items-center flex-col gap-2'>
                  <button onClick={() => handleEstateDelete(estate._id)} className='text-red-600 font-semibold capitalize'>delete</button>
                  <button className='text-green-600 font-semibold capitalize'>edit</button>
                </div>
              
              </div>
            )
          })}

        </div>
      }

    </div>
  )
}

export default Profile