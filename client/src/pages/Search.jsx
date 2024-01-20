import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import EstateItem from '../components/EstateItem'


const Search = () => {
    
    const navigate = useNavigate()
    
    const [loading , setLoading] = useState(false)
    const [estates , setEstates] = useState([])

    const [sidebarData , setSidebarData] = useState({
        searchTerm : "" ,
        type : "all" ,
        parking : false ,
        furnished : false ,
        offer : false ,
        sort : "created_at" ,
        order : "desc"
    })
    

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
    
        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setSidebarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
          });
        }


        const fetchEstates = async () => {

            try {
                setLoading(true)
                const searchQuery = urlParams.toString()
                
                const response = await axios.get(`/api/estate/getEstates?${searchQuery}`)

                setEstates(response.data)
                setLoading(false)

            } catch (error) { 
                console.log(error)
            }
        }

        fetchEstates()

    } , [location.search])

    console.log(estates)



    const handleChange = e => {

        if(e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale"){
            setSidebarData({...sidebarData , type : e.target.id})
        }

        if(e.target.id === "searchTerm"){
            setSidebarData({...sidebarData , searchTerm : e.target.value})
        }

        if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
            setSidebarData({
                ...sidebarData ,
                // some times the check value be a boolean or a string
                [e.target.id] : e.target.checked || e.target.checked === "true" ? true : false
            })
        }

        if(e.target.id === "sort_order"){
            const sort = e.target.value.split("_")[0] || "created_at"
            const order = e.target.value.split("_")[1] || "desc"
            setSidebarData({...sidebarData , sort , order})
        }

    }



    const handleSubmit = (e) => {

        e.preventDefault()

        const urlParams = new URLSearchParams()

        urlParams.set("searchTerm" , sidebarData.searchTerm)
        urlParams.set("type" , sidebarData.type)
        urlParams.set("parking" , sidebarData.parking)
        urlParams.set("furnished" , sidebarData.furnished)
        urlParams.set("offer" , sidebarData.offer)
        urlParams.set("sort" , sidebarData.sort)
        urlParams.set("order" , sidebarData.order)

        const searchQuery = urlParams.toString()

        navigate(`/search?${searchQuery}`)

    }




  return (
    <div className='flex flex-col md:flex-row'>

        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>

            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>

                <div className='flex items-center gap-2'>
                    <label htmlFor="searchTerm" className='whitespace-nowrap text-md text-slate-600 font-semibold'>Search Term</label>
                    <input value={sidebarData.searchTerm} onChange={handleChange} type="text" id='searchTerm' name='searchTerm' placeholder='Search...' className='border w-full rounded-lg p-3' />
                </div>
                
                <div className='flex gap-3 flex-wrap items-center'>
                    
                    <label className='text-md text-slate-600 font-semibold'>Type :</label>
                    
                    <div className='flex gap-2'>
                        <input checked={sidebarData.type === "all"} onChange={handleChange} id='all' type="checkbox" className='w-6'/>
                        <span>Rent & Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input checked={sidebarData.type === "rent"} onChange={handleChange} id='rent' type="checkbox" className='w-6'/>
                        <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input checked={sidebarData.type === "sale"} onChange={handleChange} id='sale' type="checkbox" className='w-6'/>
                        <span>Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input checked={sidebarData.offer} onChange={handleChange} id='offer' type="checkbox" className='w-6'/>
                        <span>Offer</span>
                    </div>
                
                </div>
                
                <div className='flex gap-3 flex-wrap items-center'>
                    
                    <label className='text-md text-slate-600 font-semibold'>Amenities :</label>
                    
                    <div className='flex gap-2'>
                        <input checked={sidebarData.parking} onChange={handleChange} id='parking' type="checkbox" className='w-6'/>
                        <span>Parking</span>
                    </div>

                    <div className='flex gap-2'>
                        <input checked={sidebarData.furnished} onChange={handleChange} id='furnished' type="checkbox" className='w-6'/>
                        <span>Furnished</span>
                    </div>
                
                </div>

                <div className='flex gap-2 items-center'>

                    <label className='text-md text-slate-600 font-semibold'>Sort :</label>

                    <select onChange={handleChange} defaultValue={"created_at_desc"} id="sort_order" className='border rounded-lg p-3'>

                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    
                    </select>
                
                </div>
                
                <button className='bg-slate-700 p-3 capitalize rounded-lg text-white hover:opacity-80'>search</button>

            </form>

        </div>



        <div className='p-3'>

            <h1 className='text-3xl border-b font-semibold p-3 text-slate-600'>Estates Results</h1>

            <div className='p-7 flex flex-wrap gap-4'>

                {!loading && estates.length === 0 && (
                    <p className='text-xl text-slate-700'>No Estates found !</p>
                )}

                {loading && (
                    <p className='text-xl text-slate-700'>Loading...</p>
                )}

                {!loading && estates && estates.map((estate) => {
                    return(
                        <EstateItem key={estate._id} estate={estate}/>
                    )
                })}

            </div>

        </div>


    </div>
  )
}

export default Search