import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import Program from '../components/pagesCompo/whatwedo/Program'
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
        <Program/>
        <DigiXplore/>
        <Netritva/>
        <Akshar/>
        {/* <School/> */}
        <Footer/>
    </div>
  )
}

export default WhatWeDo