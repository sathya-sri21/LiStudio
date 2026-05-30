import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import Login from '../Components/Home/Login/Login'
import Signup from '../Components/Home/Signup/Signup'
import MakeVideo from '../Components/Editor/MakeVideo/MakeVideo'
import VideoEditor from '../Components/Editor/Edit/Edit'
import Features from '../Components/Home/Feature/Feature'
import About from '../Components/Home/About/About'
import Pricing from '../Components/Home/Pricing/Pricing'
import Contact from '../Components/Home/Contact/Contact'

const Routing = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Homepage />} />
         <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/makevideo' element={<MakeVideo />} />
        <Route path='/editor' element={<VideoEditor />} />
        <Route path='/feature' element={<Features />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<Contact/>}/>
        
        

        
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
