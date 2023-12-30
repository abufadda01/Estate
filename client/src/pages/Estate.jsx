import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import axios from 'axios';



export default function Estate() {

  SwiperCore.use([Navigation]);
  
  const [estate, setEstate] = useState(null);
  
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(false);
  
  const [copied, setCopied] = useState(false);
  
  const [contact, setContact] = useState(false);
  
  const params = useParams();
  
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    
    const fetchListing = async () => {
    
        try {

            setLoading(true);
        
            const res = await axios.get(`/api/estate/getEstate/${params.estateId}`);
        
            setEstate(res.data);
            
            setLoading(false);
            
            setError(false);

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  
}, [params.listingId]);


  return (
    <main className='mt-3'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {estate && !loading && !error && (
        <div>
          <Swiper navigation>
            {estate.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{background: `url(${url}) center no-repeat` , backgroundSize : "cover"}}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {estate.name} - ${' '}
              {estate.offer
                ? estate.discountPrice.toLocaleString('en-US')
                : estate.regularPrice.toLocaleString('en-US')}
              {estate.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {estate.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {estate.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {estate.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+estate.regularPrice - +estate.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'> 
              <span className='font-semibold text-black'>Description - </span>
              {estate.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {estate.bedrooms > 1
                  ? `${estate.bedrooms} beds `
                  : `${estate.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {estate.bathrooms > 1
                  ? `${estate.bathrooms} baths `
                  : `${estate.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {estate.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {estate.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && estate.user !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {/* {contact && <Contact listing={listing} />} */}
          </div>
        </div>
      )}
    </main>
  );
}