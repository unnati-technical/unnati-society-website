import React from 'react'
import digiXplore from './../../../assets/digiImage.png'
import bgImg from './../../../assets/imageDigi.png'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate=useNavigate();
  return (
    <section className="relative bg-cover bg-center bg-no-repeat flex justify-between items-center min-h-[80vh] h-screen text-white" style={{backgroundImage:`url(${bgImg})`}}>
       <div className="absolute inset-0 z-10 bg-black/40"></div>
       <div className='z-20 flex flex-col justify-between items-center w-full'>
        <div className='flex justify-center items-center'>
            <div className='w-60 h-50 flex justify-center items-center'>
                <img src={digiXplore} alt="" />
            </div>
            <div>
                <h1 className='stick-no-bills-2 text-5xl text-white tracking-wider'>DIGIXPLORE</h1>
                <p className='stick-no-bills tracking-wider'>Empowering Setudents With Computer Skills And Digital Confidence To Explore A Smarter Future.</p>
            </div>
        </div>
        <div className='mr-10 flex flex-col gap-5 justify-center'>
        <div className='mr-10 flex flex-row gap-5 justify-center'>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/GirlsInterCollege')}>
                Girls Inter College, Sabour <br /> 
            </div>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/InterCollegeBahadurpur')}>
                Inter College ,Bahadurpur <br /> 
            </div>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/InterCollegeSabour')}>
                Inter College ,Sabour <br /> 
            </div>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/MSAryaTola')}>
                MS Arya Tola <br /> 
            </div>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/MSRaniTalav')}>
                MS Rani Talav <br /> 
            </div>
        </div>
        <div className='mr-10 flex flex-row gap-5 justify-center'>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/MSBahadurpur')}>
                MS Bahadurpur <br /> 
            </div>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/MSBabupur')}>
                MS Babupur <br /> 
            </div>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/MSJhurkhuria')}>
                MS Jhurkhuria <br /> 
            </div>
            <div className='h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer text-center'
                 onClick={() => navigate('/media/digiXplore/schools/MSMeerachak')}>
                MS Meerachak <br /> 
            </div>
        </div>
        </div>
       </div>

    </section>
  )
}

export default HeroSection