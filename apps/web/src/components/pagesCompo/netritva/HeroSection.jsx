import React from 'react'
import netritva from './../../../assets/netritvaImgCopy.png'
import bgImg from './../../../assets/imageNet.png'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate=useNavigate();
  return (
    <section className="relative bg-cover bg-center bg-no-repeat flex justify-between items-center min-h-[50vh] h-screen text-white" style={{backgroundImage:`url(${bgImg})`}}>
       <div className="absolute inset-0 z-10 bg-black/40"></div>
       <div className='z-20 flex justify-between items-center w-full flex-col'>
        <div className='flex justify-center items-center'>
            <div className='w-30 h-60 flex justify-center items-center'>
                <img src={netritva} alt="" />
            </div>
            <div>
                <h1 className='stick-no-bills-2 text-5xl text-white tracking-wider'>NETRITVA</h1>
                <p className='stick-no-bills tracking-wider'>Helping Student Discover The Right Career Path Through Guidance. Clarity. And Real Conversations.</p>
            </div>
        </div>
        <div className='mr-10 mt-5 flex flex-row gap-5'>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer'
                 onClick={() => navigate('/media/netritva/workshop-1')}>
                Girls Inter College,Sabour
                
            </div>
            
        </div>
       </div>

    </section>
  )
}

export default HeroSection