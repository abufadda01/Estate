import React from 'react'


const CreateEstate = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>

        <h1 className='text-3xl text-center font-semibold my-7'>Create Estate</h1>

        {/* // display will be a column , then on bigger screens (big than small) will become row */}
        <form className='flex flex-col sm:flex-row gap-7'>
            
            {/* all inputs div */}
            <div className='flex flex-col gap-4 flex-1'>
                
                <input type="text" placeholder='estate name' className='border p-3 rounded-lg' name='estateName' maxLength={62} minLength={10} required />
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' name='description' required />
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' name='address' required />

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

                <div className='flex flex-wrap gap-6 mt-4'>

                    <div className='flex items-center gap-2'>
                        <input type="number" name='bedrooms' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        <p>Bedrooms</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" name='bathrooms' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        <p>Bathrooms</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" name='regularPrice' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>

                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" name='discountPrice' className='p-3 rounded-lg border-gray-300' min={1} max={10} required />
                        
                        <div className='flex flex-col items-center'>
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
                    <input className='p-2 rounded w-full border border-gray-300' type="file" accept='image/*' multiple name='images' />
                    <button className='capitalize p-2 border bg-green-700 border-green-700 text-white  rounded hover:shadow-lg hover:bg-white hover:text-green-700 transition-all duration-150 ease-in disabled:opacity-80'>upload</button>
                </div>

            <button className='p-3 rounded-lg bg-slate-700 text-white capitalize hover:opacity-90 disabled:opacity-80'>Create Estate</button>
            
            </div>

        </form>

    </main>
  )
}

export default CreateEstate