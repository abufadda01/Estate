import React from 'react'



const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>

        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>

            <form className='flex flex-col gap-8'>

                <div className='flex items-center gap-2'>
                    <label htmlFor="searchTerm" className='whitespace-nowrap text-md text-slate-600 font-semibold'>Search Term</label>
                    <input type="text" id='searchTerm' name='searchTerm' placeholder='Search...' className='border w-full rounded-lg p-3' />
                </div>
                
                <div className='flex gap-3 flex-wrap items-center'>
                    
                    <label className='text-md text-slate-600 font-semibold'>Type :</label>
                    
                    <div className='flex gap-2'>
                        <input id='all' type="checkbox" className='w-6'/>
                        <span>Rent & Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input id='rent' type="checkbox" className='w-6'/>
                        <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input id='sale' type="checkbox" className='w-6'/>
                        <span>Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input id='offer' type="checkbox" className='w-6'/>
                        <span>Offer</span>
                    </div>
                
                </div>
                
                <div className='flex gap-3 flex-wrap items-center'>
                    
                    <label className='text-md text-slate-600 font-semibold'>Amenities :</label>
                    
                    <div className='flex gap-2'>
                        <input id='parking' type="checkbox" className='w-6'/>
                        <span>Parking</span>
                    </div>

                    <div className='flex gap-2'>
                        <input id='furnished' type="checkbox" className='w-6'/>
                        <span>Furnished</span>
                    </div>
                
                </div>

                <div className='flex gap-2 items-center'>

                    <label className='text-md text-slate-600 font-semibold'>Sort :</label>

                    <select id="sort_order" className='border rounded-lg p-3'>

                        <option value="">Price high to low</option>
                        <option value="">Price low to high</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    
                    </select>
                
                </div>
                
                <button className='bg-slate-700 p-3 capitalize rounded-lg text-white hover:opacity-80'>search</button>

            </form>

        </div>


        <div className='p-3'>

            <h1 className='text-3xl border-b font-semibold p-3 text-slate-600'>Estates Results</h1>

        </div>

    </div>
  )
}

export default Search