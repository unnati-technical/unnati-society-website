import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import Footer from '../components/common/Footer'
import Hero from '../components/pagesCompo/digiXplore/Hero'
import BriefDigi from '../components/pagesCompo/digiXplore/BriefDigi'
import ImpactDigi from '../components/pagesCompo/digiXplore/ImpactDigi'
import FutureScopeDigi from '../components/pagesCompo/digiXplore/FutureScopeDigi'

const DigiXplore = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <Hero/>
        <BriefDigi/>
        <ImpactDigi/>
        <FutureScopeDigi/>
        <Footer/>

    </div>
  )
}

export default DigiXplore