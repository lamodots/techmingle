import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext';
import {useNavigate, useLocation, Link, useParams} from 'react-router-dom'

import axios from 'axios'
import HashLoader from 'react-spinners/HashLoader'

const override = {
  display: "block",
  margin: "0 auto",
 
};

function DeletePost() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useContext( UserContext)
  const {id} = useParams()

  const token = currentUser?.token;
  const navigate = useNavigate()
  //Protech the component
  useEffect(()=> {
    if(!token){
      navigate('/login')
    }
  },[])

  // Delete  the post
  const deletePost = async (id)=> {
    setIsLoading(true)
    try {
      const resonse = await axios.delete(`http://localhost:5000/api/posts/${id}`,  {
        withCredentials: true,
        headers: { Authorization: `BEARER ${token}`}
      })

      if(resonse.status === 200){
        navigate('.')
      }

    } catch (err) {
      setError(err.resonse.data.message)
    }

    setIsLoading(false)
  }
  

  if(isLoading){
    return <HashLoader color='#ff3333' cssOverride={override} />
  }
  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Confirm that you wish to delete post</h1>
      <Link onClick={()=> deletePost(id)}>Delete Post</Link>
    </div>
  )
}

export default DeletePost