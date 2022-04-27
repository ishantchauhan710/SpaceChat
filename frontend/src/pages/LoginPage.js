import React from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChatIcon from '@mui/icons-material/Chat';
import SideScreenComponent from '../components/LoginPage/SideScreenComponent';

export const LoginPage = () => {
  return (
    <div className='container-login-page'>

      <div className='container-login-page-form'>
        <div className='container-login-form'>

        

          <div className="container-login-form-header-image"> 
            <img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Rocket_Emoji_1024x1024.png?v=1571606064" />
          </div>

          <span className='text-h2'>Login</span>
          <TextField id="filled-basic" label="Email or Username" variant="outlined" size="small" fullWidth style={{marginTop: 15}} />
          <TextField id="filled-basicc" type="password" label="Password" variant="outlined" size="small" fullWidth style={{marginTop: 15}} />
          <Button variant="contained" style={{width: '100%', marginTop: 20}}>Login</Button>
          <span className='text-secondary'>or</span>
          <Button variant="outlined" style={{width: '100%', marginTop: 10}}>Create a new account</Button>
          
        </div>
      </div>

      <div className='container-login-page-side-screen'>
         <SideScreenComponent />
      </div>

    



    </div>
  )
}
