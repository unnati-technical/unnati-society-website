import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { DelayedChatbot } from './components/common/DelayedChatbot'
import { Toaster } from 'sonner'
import { Loader2 } from 'lucide-react'

// Global Loading Indicator for Suspense
const GlobalLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
  </div>
);

// Scroll to Top on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Lazy Loaded Routes
const Homepage = React.lazy(() => import('./pages/Homepage'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const WhatWeDo = React.lazy(() => import('./pages/WhatWeDo'));
const Media = React.lazy(() => import('./pages/Media'));
const MediaDigiXplore = React.lazy(() => import('./pages/MediaDigiXplore'));
const MediaNetritva = React.lazy(() => import('./pages/MediaNetritva'));
const MediaAkshar = React.lazy(() => import('./pages/MediaAkshar'));
const MediaEvent1 = React.lazy(() => import('./components/pagesCompo/akshar/MediaEvent1'));
const MediaEvent3 = React.lazy(() => import('./components/pagesCompo/akshar/MediaEvent3'));
const MediaEvent2 = React.lazy(() => import('./components/pagesCompo/akshar/MediaEvent2'));
const PrashastiMedia = React.lazy(() => import('./components/pagesCompo/media/PrashastiMedia'));
const WorkShop1 = React.lazy(() => import('./components/pagesCompo/netritva/WorkShop1'));
const GirlsInterCollege = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/GirlsInterCollege'));
const InterCollegeBahadurpur = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/InterCollegeBahadurpur'));
const InterCollegeSabour = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/InterCollegeSabour'));
const MSAryaTola = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/MSAryaTola'));
const MSRaniTalav = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/MSRaniTalav'));
const MSBahadurpur = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/MSBahadurpur'));
const MSBabupur = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/MSBabupur'));
const MSJhurkhuria = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/MSJhurkhuria'));
const MSMeerachak = React.lazy(() => import('./components/pagesCompo/digiXplore/schools/MSMeerachak'));
const BabupurClass = React.lazy(() => import('./components/pagesCompo/akshar/BabupurClass'));
const MediaSchool = React.lazy(() => import('./pages/MediaSchool'));
const DPS = React.lazy(() => import('./components/pagesCompo/school/DPS'));
const SFS = React.lazy(() => import('./components/pagesCompo/school/SFS'));
const MountAsisi = React.lazy(() => import('./components/pagesCompo/school/MountAsisi'));
const RajUchh = React.lazy(() => import('./components/pagesCompo/school/RAjUchh'));
const Executivebody = React.lazy(() => import('./pages/Executivebody'));
const DigiXplore = React.lazy(() => import('./pages/DigiXplore'));
const Akshar = React.lazy(() => import('./pages/Akshar'));
const Netritva = React.lazy(() => import('./pages/Netritva'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Outreach = React.lazy(() => import('./pages/Outreach'));
const JoinUs = React.lazy(() => import('./pages/JoinUs'));
const Donate = React.lazy(() => import('./pages/Donate'));
const VerificationPage = React.lazy(() => import('./pages/VerificationPage'));

// Trigger Vercel deployment update
const App = () => {
  const navigate = useNavigate();
  
  const handleBotNavigate = (action) => {
    switch (action) {
      case 'nav_programs': navigate('/programs'); break;
      case 'nav_contact': navigate('/contact'); break;
      case 'nav_donate': navigate('/donate'); break;
      case 'nav_team': navigate('/executive-body'); break;
      case 'nav_resources': navigate('/resources'); break;
      case 'nav_media': navigate('/media'); break;
      case 'about_unnati': navigate('/about-us'); break;
      default: break;
    }
  };

  return (
    <div>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <DelayedChatbot onNavigate={handleBotNavigate} />
      <Suspense fallback={<GlobalLoader />}>
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
           
           <Route path="/outreach" element={<Outreach/>}/>
           <Route path="/join-us" element={<JoinUs/>}/>
           <Route path="/donate" element={<Donate/>}/>
           <Route path="/verify/*" element={<VerificationPage/>}/>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App