import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import HeroSection from '../components/pagesCompo/aboutus/HeroSection'
import Aboutus from '../components/pagesCompo/aboutus/Aboutus'
import Purpose from '../components/pagesCompo/aboutus/Purpose'
import CollegeCardFaculty from '../components/pagesCompo/aboutus/CollegeCardFaculty'
import Footer from '../components/common/Footer'

const AboutUs = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <HeroSection/>
        <Aboutus/>
        <Purpose/>
        <CollegeCardFaculty/>
        <Footer/>
    </div>
  )
}

export default AboutUs