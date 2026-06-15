import React from 'react'
import icon from './../../../assets/right-arrow.png'
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  return (
    <section className='flex justify-center items-center py-20 w-screen '>
        <div className='flex flex-col gap-10 w-3/4 overflow-x-hidden md:overflow-x-scroll scrollbar-hide'>
            <div>
                <h1 className='oswald-font-3 text-2xl'>OUR UPCOMING EVENTS</h1>
            </div>
            <div className='flex flex-col md:flex-row gap-10'>
                <div className='w-full md:min-w-1/2 lg:min-w-1/3 border rounded-2xl bg-blue-400 p-5 border-none flex justify-between items-center'>
                    <div>
                        <h1 className='text-4xl oswald-font-3 text-white'>5</h1>
                        <p className='oswald-font-2 mb-4 text-white'>AUG</p>
                        <h1 className='oswald-font-3'>UNNATI PRASASTHI SAMAROH</h1>
                    </div>
                    <div className='bg-white border-0 rounded-full p-2 cursor-pointer'>
                        <img src={icon} alt="" 
                             onClick={()=>navigate("/media/PrashastiMedia")}      
                        />
                    </div>
                </div>
                <div className='w-full md:min-w-1/2 lg:min-w-1/3 border rounded-2xl bg-[#FACC15] p-5 border-none flex justify-between items-center'>
                    <div>
                        <h1 className='text-4xl oswald-font-3 text-[#111111]'>14</h1>
                        <p className='oswald-font-2 mb-4 text-[#111111]'>NOV</p>
                        <h1 className='oswald-font-3'>CHILDREN'S DAY</h1>
                    </div>
                    <div className='bg-white border-0 rounded-full p-2 cursor-pointer'> 
                        <img src={icon} alt="" 
                             onClick={()=>navigate("/media/akshar/event-2")}                        
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Events