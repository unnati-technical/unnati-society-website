import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import HeroSection from '../components/pagesCompo/media/HeroSection'
import SchoolVisit from './../components/pagesCompo/media/SchoolVisit'
import Footer from '../components/common/Footer'

const Media = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <HeroSection/>
        <SchoolVisit/>
        <Footer/>
    </div>
  )
}

export default Media