import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import HeroSection from '../components/pagesCompo/homepage/HeroSection'
import Aboutus from '../components/pagesCompo/homepage/Aboutus'
import Vision from '../components/pagesCompo/homepage/Vision'
import Program from '../components/pagesCompo/homepage/Program'
import Data from '../components/pagesCompo/homepage/Data'
import Conttibute from '../components/pagesCompo/homepage/Conttibute'
import Events from '../components/pagesCompo/homepage/Events'
import Education from '../components/pagesCompo/homepage/Education'
import Footer from '../components/common/Footer'
import Testimonial1 from '../components/pagesCompo/homepage/Testimonial1'
import Testimonial2 from '../components/pagesCompo/homepage/Testimonial2'
import Testimonial3 from '../components/pagesCompo/homepage/Testimonial3'

const Homepage = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <HeroSection/>
        <Aboutus/>
        <Testimonial1/>
        <Education/>
        <Vision/>
        <Testimonial2/>
        <Program/>
        <Testimonial3/>
        <Data/>
        <Conttibute/>
        <Events/>
        <Footer/>
    </div>
  )
}

export default Homepage