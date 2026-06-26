import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import ProgramsShowcase from '../components/pagesCompo/whatwedo/ProgramsShowcase'
import DigiXplore from '../components/pagesCompo/whatwedo/DigiXplore'
import Netritva from '../components/pagesCompo/whatwedo/Netritva'
import Akshar from '../components/pagesCompo/whatwedo/Akshar'
import School from '../components/pagesCompo/whatwedo/School'
import Footer from '../components/common/Footer'

const WhatWeDo = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <ProgramsShowcase/>
        <DigiXplore/>
        <Netritva/>
        <Akshar/>
        {/* <School/> */}
        <Footer/>
    </div>
  )
}

export default WhatWeDo