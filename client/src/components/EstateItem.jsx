import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from "react-icons/md"


const EstateItem = ({estate}) => {

    console.log(estate)
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg w-full sm:w-[320px]'>
        <Link to={`/estate/${estate._id}`}>
            <img src={estate.imageUrls[0] || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Festate&psig=AOvVaw2mwTRL3p8XGpoicLKydOFb&ust=1705854628988000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCJCive-x7IMDFQAAAAAdAAAAABAJ"} alt="" className='h-[300px] sm:h-[180px] rounded-lg object-cover w-full hover:scale-95 transition-scale duration-300' />

        <div className='p-3 flex flex-col w-full gap-2  '>
           
           <p className='truncate text-lg font-semibold text-slate-800 capitalize'>{estate.name}</p> 

            <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-600'/>
                <p className='w-full text-sm text-gray-600 truncate'>{estate.address}</p>
            </div>

            <p className='text-sm text-gray-600 line-clamp-2'>{estate.description}</p>
            
            <p className='text-sm mt-2 font-semibold flex items-center'>
            $
            {
             estate.offer 
                ? estate.discountPrice.toLocaleString('en-US') 
                : estate.regularPrice.toLocaleString('en-US')
            }

            {estate.typeOfEstate  === 'rent' && ' / month'}

            </p>

            <div className='text-slate-700 flex gap-3'>

                <div className='font-semibold text-xs'>
                    {estate.bedrooms > 1 ? `${estate.bedrooms} beds` : `${estate.bedrooms} bed`}
                </div>
                
                <div className='font-semibold text-xs'>
                    {estate.bathrooms > 1 ? `${estate.bathrooms} baths` : `${estate.bathrooms} bath`}
                </div>

            </div>

        </div>
        
        </Link>

    </div>
  )
}

export default EstateItem