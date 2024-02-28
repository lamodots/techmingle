import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import {useNavigate} from 'react-router-dom';

function Logout() {
  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()
  setCurrentUser(null)
  navigate("/login")
  return (
    <></>
  )
}

export default Logout