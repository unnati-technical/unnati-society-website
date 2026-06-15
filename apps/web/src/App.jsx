import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AboutUs from './pages/AboutUs'
import WhatWeDo from './pages/WhatWeDo'
import Media from './pages/Media'
import MediaDigiXplore from './pages/MediaDigiXplore'
import MediaNetritva from './pages/MediaNetritva'
import MediaAkshar from './pages/MediaAkshar'
import MediaEvent1 from './components/pagesCompo/akshar/MediaEvent1'
import MediaEvent3 from './components/pagesCompo/akshar/MediaEvent3'
import MediaEvent2 from './components/pagesCompo/akshar/MediaEvent2'
import PrashastiMedia from './components/pagesCompo/media/PrashastiMedia'
import WorkShop1 from './components/pagesCompo/netritva/WorkShop1'
import GirlsInterCollege from './components/pagesCompo/digiXplore/schools/GirlsInterCollege'
import InterCollegeBahadurpur from './components/pagesCompo/digiXplore/schools/InterCollegeBahadurpur'
import InterCollegeSabour from './components/pagesCompo/digiXplore/schools/InterCollegeSabour'
import MSAryaTola from './components/pagesCompo/digiXplore/schools/MSAryaTola'
import MSRaniTalav from './components/pagesCompo/digiXplore/schools/MSRaniTalav'
import MSBahadurpur from './components/pagesCompo/digiXplore/schools/MSBahadurpur'
import MSBabupur from './components/pagesCompo/digiXplore/schools/MSBabupur'
import MSJhurkhuria from './components/pagesCompo/digiXplore/schools/MSJhurkhuria'
import MSMeerachak from './components/pagesCompo/digiXplore/schools/MSMeerachak'
import BabupurClass from './components/pagesCompo/akshar/BabupurClass'
import MediaSchool from './pages/MediaSchool'
import DPS from './components/pagesCompo/school/DPS'
import SFS from './components/pagesCompo/school/SFS'
import MountAsisi from './components/pagesCompo/school/MountAsisi'
import RajUchh from './components/pagesCompo/school/RAjUchh'
import Executivebody from './pages/Executivebody'
import DigiXplore from './pages/DigiXplore'
import Akshar from './pages/Akshar'
import Netritva from './pages/Netritva'
import Resources from './pages/Resources'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div>
      <Routes>
         <Route path="/" element={<Homepage/>}/>
         <Route path="/about-us" element={<AboutUs/>}/>
         <Route path="/contact" element={<Contact/>}/>

         <Route path="/programs" element={<WhatWeDo/>}/>
         <Route path="/programs/digiXplore" element={<DigiXplore/>}/>
         <Route path="/programs/netritva" element={<Netritva/>}/>
         <Route path="/programs/akshar" element={<Akshar/>}/>

         <Route path="/media" element={<Media/>}/>
         <Route path="/media/digiXplore" element={<MediaDigiXplore/>}/>
         <Route path="/media/netritva" element={<MediaNetritva/>}/>
         <Route path="/media/akshar" element={<MediaAkshar/>}/>

         <Route path="/media/digiXplore/schools/GirlsInterCollege" element={<GirlsInterCollege/>}/>
         <Route path="/media/digiXplore/schools/InterCollegeBahadurpur" element={<InterCollegeBahadurpur/>}/>
         <Route path="/media/digiXplore/schools/InterCollegeSabour" element={<InterCollegeSabour/>}/>
         <Route path="/media/digiXplore/schools/MSAryaTola" element={<MSAryaTola/>}/>
         <Route path="/media/digiXplore/schools/MSRaniTalav" element={<MSRaniTalav/>}/>
         <Route path="/media/digiXplore/schools/MSBahadurpur" element={<MSBahadurpur/>}/>
         <Route path="/media/digiXplore/schools/MSBabupur" element={<MSBabupur/>}/>
         <Route path="/media/digiXplore/schools/MSJhurkhuria" element={<MSJhurkhuria/>}/>
         <Route path="/media/digiXplore/schools/MSMeerachak" element={<MSMeerachak/>}/>

         <Route path="/media/akshar/event-1" element={<MediaEvent1/>}/>
         <Route path="/media/akshar/event-2" element={<MediaEvent2/>}/>
         <Route path="/media/akshar/event-3" element={<MediaEvent3/>}/>
         <Route path="/media/akshar/BabupurClass" element={<BabupurClass/>}/>
         <Route path="/media/PrashastiMedia" element={<PrashastiMedia/>}/>

         <Route path="/media/netritva/workshop-1" element={<WorkShop1/>}/>

         <Route path="/media/outreach/school-visit" element={<MediaSchool/>}/>
         <Route path="/media/outreach/school-visit/mountAssisi" element={<MountAsisi/>}/>
         <Route path="/media/outreach/school-visit/DPS" element={<DPS/>}/>
         <Route path="/media/outreach/school-visit/SFS" element={<SFS/>}/>
         <Route path="/media/outreach/school-visit/uchh-vidyalaya" element={<RajUchh/>}/>

         <Route path="/executive-body" element={<Executivebody/>}/>

         <Route path='/resources' element={<Resources/>}/>
      </Routes>
    </div>
  )
}

export default App