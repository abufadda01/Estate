import axios from 'axios'
import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {Swiper , SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';


const Estate = () => {

    SwiperCore.use([Navigation])

    const params = useParams()

    const [estate , setEstate] = useState(null)
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)


    useEffect(() => {

        const getEstate = async () => {
             
            try {
                
                setLoading(true)

                const estateId = params.estateId
                
                const response = await axios.get(`/api/estate/getEstate/${estateId}`)
                
                setEstate(response.data)
                
                setLoading(false)
                setError(false)
                
            } catch (error) {
                console.log(error)
                setError(true)
                setLoading(false)
            }
        }
        
        getEstate()
        
    } , [params.estateId])
    


    return (
    <main>

        {loading && <p className='text-center mt-4 text-2xl '>Loading ...</p>}
        
        {error && <p className='text-center mt-4 text-2xl text-red-600'>Smth went wrong ! </p>}

        {estate && !loading && !error && (
            <Swiper navigation modules={[Navigation]}>
                {estate.imageUrls.map((url) => {
                    return(
                        <SwiperSlide key={url}>
                            <div className='h-[500px]' style={{background : `url(${url}) center no-repeat` , backgroundSize : "cover"}}></div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        )}

    </main>
  )
}

export default Estate