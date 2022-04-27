import React from 'react';
import {Button, IconButton} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChatIcon from '@mui/icons-material/Chat';

export const LoginPage = () => {
  return (
    <div className='container-login-page'>

      <div className='container-login-page-form'>

      </div>

      <div className='container-login-page-side-screen'>
         
         <div className='container-login-page-side-screen-body'>
         <span className='text-h1'>Welcome to SpaceChat</span>

          <span className='text-h3' style={{marginTop: "10px"}}>
            Discover people and make friends! SpaceChat provides an easy and secure way to chat with anyone around the world! Built with the power of NodeJs and Socket.io, SpaceChat is one of the best open source chat solutions for startups.
          </span>
          <br />
          <span className='text-h2'>Why choose SpaceChat?</span>
          <ul className='list-why-choose-us'>
          <li>Free to use</li>
          <li>Unlimited messages</li>
          <li>Secure and fast</li>
          <li>Strong data encryption</li>
          <li>Open source</li>
          </ul>

          <div className='container-login-side-screen-buttons'>

      

            <Button style={{backgroundColor: "#171515"}} variant="contained" endIcon={<GitHubIcon />}>
              Source Code
            </Button>

          </div>

         </div>

         <div className='container-login-footer'>
           Made with &nbsp; <i className='material-icons'>favorite</i> &nbsp; by Ishant Chauhan
         </div>


      </div>

    



    </div>
  )
}
