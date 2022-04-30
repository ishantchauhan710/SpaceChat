import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkIfUserIsLoggedOut } from '../logic/authorizationFunctions';

export const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    checkIfUserIsLoggedOut(navigate)
  },[]);


  return (
    <div>HomePage</div>
  )
}
