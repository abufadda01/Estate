import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Contact = ({estate}) => {

    const {token} = useSelector((state) => state.user)
    
    const [landlord , setLandlord] = useState(null)
    const [message , setMessage] = useState("")


    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await axios.get(`/api/user/getUser/${estate.user}` , {
                    headers : {
                        "access_token" : token
                    }
                })

                setLandlord(response.data)

            } catch (error) {
                console.log(error)
            }
        }

        getUser()

    } , [estate.user])




  return (
    <>
        {landlord && (

            <div className='flex flex-col gap-2'>
            
                <p className='font-semibold text-lg'>Contact 
                    <span className='capitalize'> {landlord?.username} </span>
                     {/* <span className='font-semibold'>
                        {landlord?.name}
                     </span> */}
                </p>

                <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                name="message" 
                id="message" 
                cols="3" 
                rows="3"
                placeholder='Enter your message here'
                className='w-full border p-3 rounded-lg mt-2'
                ></textarea>

                <Link
                    to={`mailto:${landlord?.email}?subject=Regarding ${landlord?.name}&body=${message}`}
                    className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                >
                    Send Message          
                </Link>

            </div>
        )}
    </>
  )
}


export default Contact