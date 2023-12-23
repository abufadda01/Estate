import React, { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import {app} from "../firebase"


const CreateEstate = () => {

    const [files , setFiles] = useState([])

    const [formData , setFormData] = useState({
        imageUrls : []
    })

    const [imageUploadError , setImageUploadError] = useState(false)
    
    const [imageUploded , setImageUploaded] = useState(false)



    const handleImagesUpload = async (e) => {
        
        e.preventDefault()

        if(files.length > 0 && files.length + files.length < 7){

            setImageUploaded(true)
            setImageUploadError(false)
            
            // we have a multi image upload so we have multi async operations and we have to wait all of them
            const promises = []

            let i = 0

            for(i ; i < files.length ; i++){
                // storeImage fun that return async operation , we push every async operation result in the promises array
                promises.push(storeImage(files[i]))
            }

            // then we iterate over the promises array by Promise.all and update the formData imageUrls
            Promise.all(promises)
            .then((urls) => {
                setFormData({...formData , imageUrls : formData.imageUrls.concat(urls)})
                setImageUploadError(false)
                setImageUploaded(false)
            }).catch((err) => {
                setImageUploadError('image upload failed (2 mb max sixe per image)')
            })

            
        }else{
            setImageUploadError("you can only upload 6 images per estate")
            setTimeout(() => {
                setImageUploadError(false)
                setImageUploaded(false)
            } , 3000)
        }

    }



    const handleImageDelete = (imgIndex) => {
        setFormData({...formData , imageUrls : formData.imageUrls.filter((_ , i) => i !== imgIndex)})
    }
    


    const storeImage = async (file) => {

        return new Promise((resolve , reject) => {

            const storage = getStorage(app)
            const fileName = Math.floor(Math.random() * 100) + file.name
            const storageRef = ref(storage , fileName)
            const uploadTask = uploadBytesResumable(storageRef , file)

            uploadTask.on("state_changed" ,
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, 
            (error) => {
                reject(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>{
                    resolve(downloadUrl)
                })
            })
        })
    }



  return (
    <main className='p-3 max-w-4xl mx-auto'>

        <h1 className='text-4xl text-center font-semibold mt-7 mb-10'>Create Estate</h1>

        {/* // display will be a column , then on bigger screens (big than small) will become row */}
        <form className='flex flex-col sm:flex-row gap-7'>
            
            {/* all inputs div */}
            <div className='flex flex-col gap-4 flex-1'>
                
                {/* text inputs */}
                <input type="text" placeholder='estate name' className='border p-3 rounded-lg' name='estateName' maxLength={62} minLength={10} required />
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' name='description' required />
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' name='address' required />
                
                {/* check box inputs div */}
                <div className='flex gap-6 flex-wrap mt-4'>

                    <div className='flex gap-2'>
                        <input type="checkbox" name='sale' className='w-5' />
                        <span>Sell</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" name='parking' className='w-5' />
                        <span>Parking spot</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" name='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" name='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" name='offer' className='w-5' />
                        <span>Offer</span>
                    </div>

                </div>

                {/* number inputs div */}
                <div className='flex flex-wrap gap-6 mt-4'>

                    <div className='flex items-center gap-2'>
                        <input type="number" name='bedrooms' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        <p>Bedrooms</p>
                    </div>

                    <div className='flex items-center  gap-2'>
                        <input type="number" name='bathrooms' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        <p>Bathrooms</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" name='regularPrice' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        
                        <div className='flex flex-col items-start'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>

                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" name='discountPrice' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        
                        <div className='flex flex-col items-start'>
                            <p>Discount Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>

                    </div>

                </div>

            </div>

            {/* images input , submit btn */}
            <div className='flex flex-col gap-4 flex-1'>

                <p className='font-semibold'>Images : 
                    <span className='font-normal text-gray-600 ml-2'>
                        The first image will be the cover (max 6 images)
                    </span> 
                </p>

                <div className='flex gap-4'>
                    <input onChange={(e) => setFiles(e.target.files)} className='p-2 rounded w-full border border-gray-300' type="file" accept='image/*' multiple name='images' />
                    <button type='button' disabled={imageUploded} onClick={handleImagesUpload} className='capitalize p-2 border bg-green-700 border-green-700 text-white  rounded hover:shadow-lg hover:bg-white hover:text-green-700 transition-all duration-150 ease-in disabled:opacity-80'>{imageUploded ? "Uploading..." : "upload"}</button>
                </div>

                <button className='p-3 rounded-lg bg-slate-700 text-white capitalize hover:opacity-90 disabled:opacity-80'>Create Estate</button>
            
                <p className='text-red-600 font-semibold'>{imageUploadError && imageUploadError}</p>
            
                {formData.imageUrls && formData.imageUrls.length > 0 && formData.imageUrls.map((image , index) => {
                    return (
                        <div key={index} className='flex items-center shadow-md hover:shadow-2xl transition-all ease-in duration-150 cursor-pointer justify-between p-3 border'>
                            <img src={image} className='w-24 shadow-lg h-auto object-contain rounded-lg'  alt="estate-image" />
                            <button type='button' onClick={() => handleImageDelete(index)} className='p-3 text-white bg-red-700 rounded-lg cursor-pointer hover:text-white hover:bg-slate-500 transition-all ease-in-out duration-200'>Delete</button>
                        </div>
                    )
                })}

            </div>

        </form>

    </main>
  )
}


export default CreateEstate