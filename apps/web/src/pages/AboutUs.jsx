import React, { lazy } from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import HeroSection from '../components/pagesCompo/aboutus/HeroSection'
import { LazySection } from '../components/common/LazySection'

const Aboutus = lazy(() => import('../components/pagesCompo/aboutus/Aboutus'))
const Purpose = lazy(() => import('../components/pagesCompo/aboutus/Purpose'))
const CollegeCardFaculty = lazy(() => import('../components/pagesCompo/aboutus/CollegeCardFaculty'))
const Footer = lazy(() => import('../components/common/Footer'))

const AboutUs = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <HeroSection/>
        
        <LazySection><Aboutus/></LazySection>
        <LazySection><Purpose/></LazySection>
        <LazySection><CollegeCardFaculty/></LazySection>
        <LazySection><Footer/></LazySection>
    </div>
  )
}

export default AboutUs