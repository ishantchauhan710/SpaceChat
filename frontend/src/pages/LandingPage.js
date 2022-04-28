import { Button } from '@mui/material';
import React from 'react';
import Lottie from "lottie-react";
import landingPageAnimation from "../data/anim/landing_page_animation.json";

export const LandingPage = () => {


  return (
    <div className='container-landing-page'>
      
      <div className='container-login-content'>
       
       <div className='login-content'>
          <span className='text-h1'>Discover friends and people around you</span>
          <span className='text-h2'>SpaceChat is the place where you can meet and chat with anyone in this world! Built using the power of NodeJs and Socket.io, this app is completely free and open source!</span>
          <div className='container-landing-page-buttons'>
             <Button variant="contained" style={{fontSize: 18, fontWeight: "bold", textTransform: "none",backgroundColor: "#388e3c"}}>Get Started</Button>
             <Button variant="outlined" style={{marginLeft: 20, fontSize: 18, fontWeight: "bold", textTransform: "none",borderColor: "#ffffff", color: "#ffffff"}}>View Source Code</Button>
          </div>
       </div>

      </div>

      <div className='container-login-animation'>
          <Lottie autoPlay={true} loop={true} animationData={landingPageAnimation} />
      </div>

      
      
    </div>
  )
}
