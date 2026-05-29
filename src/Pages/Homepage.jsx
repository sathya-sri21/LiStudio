import React from 'react'
import Navbar from '../Components/Home/NavBar/NavBar'
import Banner from '../Components/Home/Banner/banner'
import About from '../Components/Home/About/About'
import Footer from '../Components/Home/Footer/Footer'

const Homepage = () => {
  return (
      <>
          <Navbar/>
          <Banner />
      <About />
          <Footer/>
    </>
  )
}

export default Homepage
