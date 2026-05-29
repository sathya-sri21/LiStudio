import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import Login from '../Components/Home/Login/Login'
import Signup from '../Components/Home/Signup/Signup'
import MakeVideo from '../Components/Editor/MakeVideo/MakeVideo'
import VideoEditor from '../Components/Editor/Edit/Edit'

const Routing = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Homepage />} />
         <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/makevideo' element={<MakeVideo />} />
        <Route path='/editor' element={<VideoEditor/>} />
        

        
        
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
