import React, { lazy } from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import HeroSection from '../components/pagesCompo/homepage/HeroSection'
import { LazySection } from '../components/common/LazySection'

const Aboutus = lazy(() => import('../components/pagesCompo/homepage/Aboutus'))
const Vision = lazy(() => import('../components/pagesCompo/homepage/Vision'))
const Program = lazy(() => import('../components/pagesCompo/homepage/Program'))
const Data = lazy(() => import('../components/pagesCompo/homepage/Data'))
const Events = lazy(() => import('../components/pagesCompo/homepage/Events'))
const Education = lazy(() => import('../components/pagesCompo/homepage/Education'))
const Footer = lazy(() => import('../components/common/Footer'))
const Testimonial1 = lazy(() => import('../components/pagesCompo/homepage/Testimonial1'))
const Testimonial2 = lazy(() => import('../components/pagesCompo/homepage/Testimonial2'))

const Homepage = () => {
  return (
    <div className="overflow-x-hidden max-w-[100vw]">
        <Navbar/>
        <NavUnn/>
        <HeroSection/>
        
        <LazySection><Aboutus/></LazySection>
        <LazySection><Testimonial1/></LazySection>
        <LazySection><Education/></LazySection>
        <LazySection><Vision/></LazySection>
        <LazySection><Testimonial2/></LazySection>
        <LazySection><Program/></LazySection>
        <LazySection><Data/></LazySection>
        <LazySection><Events/></LazySection>
        <LazySection><Footer/></LazySection>
    </div>
  )
}

export default Homepage