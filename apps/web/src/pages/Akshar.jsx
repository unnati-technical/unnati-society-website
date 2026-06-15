import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import Hero from '../components/pagesCompo/akshar/Hero'
import BriefAkshar from '../components/pagesCompo/akshar/BriefAkshar'
import ImpactAkshar from '../components/pagesCompo/akshar/ImpactAkshar'
import FutureScopeAkshar from '../components/pagesCompo/akshar/FutureScopeAkshar'
import Footer from '../components/common/Footer'

const Akshar = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <Hero/>
        <BriefAkshar/>
        <ImpactAkshar/>
        <FutureScopeAkshar/>
        <Footer/>
    </div>
  )
}

export default Akshar