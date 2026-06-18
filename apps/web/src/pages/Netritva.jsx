import React from 'react'
import Navbar from '../components/common/Navbar'
import NavUnn from '../components/common/NavUnn'
import ProgramsShowcase from '../components/pagesCompo/whatwedo/ProgramsShowcase'

import BriefNet from '../components/pagesCompo/netritva/BriefNet'
import ImpactNet from '../components/pagesCompo/netritva/ImpactNet'
import FutureScopeNet from '../components/pagesCompo/netritva/FutureScopeNet'
import Footer from '../components/common/Footer'

const Netritva = () => {
  return (
    <div>
        <Navbar/>
        <NavUnn/>
        <ProgramsShowcase activeProgramId="netritva" />
        <BriefNet/>
        <ImpactNet/>
        <FutureScopeNet/>
        <Footer/>
    </div>
  )
}

export default Netritva