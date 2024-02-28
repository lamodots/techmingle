import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext';
import {useNavigate} from 'react-router-dom'

function DeletePost() {
  const navigate = useNavigate()
  const { currentUser } = useContext( UserContext)
  const token = currentUser?.token;
  useEffect(()=> {
    if(!token){
      navigate('/login')
    }
  },[])
  
  return (
    <div>DeletePost</div>
  )
}

export default DeletePost